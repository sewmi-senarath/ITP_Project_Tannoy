import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg';
import { useNavigate } from 'react-router-dom';

const SupplierDashboard = () => {
  const [suppliers, setSuppliers] = useState([]); // State to store supplier data
  const [filteredSuppliers, setFilteredSuppliers] = useState([]); // State to store filtered suppliers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state for handling API errors
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const navigate = useNavigate();

  // Fetch suppliers from the backend API when the component mounts
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/suppliers/'); // Adjust the API route
        setSuppliers(response.data); // Store the fetched suppliers in the state
        setFilteredSuppliers(response.data); // Initially, show all suppliers
        setLoading(false); // Set loading to false when data is loaded
      } catch (err) {
        setError('Error fetching suppliers');
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchSuppliers();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Group suppliers by delivery item and find the highest discount in each group
  const getHighestDiscountPerCategory = (suppliersList) => {
    const groupedSuppliers = suppliersList.reduce((groups, supplier) => {
      const category = supplier.DeliveryItem;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(supplier);
      return groups;
    }, {});

    // Find highest discount in each category
    const highestDiscountSuppliers = Object.values(groupedSuppliers).map(group => {
      return group.reduce((highest, current) =>
        parseFloat(current.Discount) > parseFloat(highest.Discount) ? current : highest
      );
    });

    return highestDiscountSuppliers;
  };

  // Filter suppliers based on the search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase(); // Make the search query case-insensitive

    const filtered = suppliers.filter(supplier =>
      supplier.supCode.toLowerCase().includes(lowerCaseQuery) ||
      supplier.ContactInfo.toString().includes(lowerCaseQuery) ||
      supplier.DeliveryItem.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]); // Run this effect whenever the searchQuery or suppliers change

  // Handle delete action
  const handleDelete = async (supId) => {
    const confirmed = window.confirm('Are you sure you want to delete this supplier?');
    if (!confirmed) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${supId}`);
      setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== supId)); // Update state after deletion
      alert('Supplier deleted successfully');
    } catch (err) {
      alert('Failed to delete supplier');
    }
  };

  // Handle edit action
  const handleEdit = (supId) => {
    navigate(`/addSupplier/${supId}`);  // Pass the supplier ID to the edit route
  };

  // Find the highest discount suppliers per category (both in search and default)
  const highestDiscountSuppliers = getHighestDiscountPerCategory(filteredSuppliers);

  // Helper to check if a supplier is the highest discount in their category
  const isHighestDiscountSupplier = (supplier) => {
    return highestDiscountSuppliers.some(highestSupplier => highestSupplier._id === supplier._id);
  };

  if (loading) {
    return <p>Loading suppliers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex">
      <div className="w-1/6 bg-gray-800 text-white h-screen p-4"> {/* Reduced sidebar width */}
        <div className="logo mb-4">
          <img src={Logo} alt="Tannoy Electricals Logo" className="w-24" /><br />
          <h2 className="text-lg">Tannoy Electricals</h2>
        </div>
        <ul className="nav-links space-y-2">
          <li><a href="/productDashboard" className="hover:text-gray-300">Product Details</a></li>
          <li><a href="/Addproduct" className="hover:text-gray-300">Add Product</a></li>
          <li><a href="/supplierdashboard" className="hover:text-gray-300">Supplier details</a></li>
          <li><a href="/Addsupplier" className="hover:text-gray-300">Add Supplier</a></li>
          <li><a href="/stockDashboard" className="hover:text-gray-300">Stock Details</a></li>
          <li><a href="/addStock" className="hover:text-gray-300">Add Stock</a></li>
          <li><a href="/stock-add" className="hover:text-gray-300">Add Inquiry</a></li>
        </ul>
        <div className="profile mt-8">
          <img src={manager} alt="Manager Photo" className="w-16 rounded-full" />
          <p>Supply Manager</p>
          <p>supplymanager@tannoy.com</p>
        </div>
        <ul className="settings mt-8 space-y-2">
          <li><a href="#" className="hover:text-gray-300">Settings</a></li>
          <li><a href="#" className="hover:text-gray-300">Log out</a></li>
        </ul>
      </div>

      <div className="flex-grow p-6"> {/* Adjusted main content to fill available space */}
        <header>
          <input
            type="text"
            placeholder="Search by Supplier Code or Contact Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
        </header>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-xl mb-4">Supplier Details</h2>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Supplier Code</th>
              <th className="py-2 px-4 border">Supplier Name</th>
              <th className="py-2 px-4 border">Contact Info</th>
              <th className="py-2 px-4 border">Delivery Item</th>
              <th className="py-2 px-4 border">Item Price</th>
              <th className="py-2 px-4 border">Discount</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map(supplier => (
                <tr
                  key={supplier._id}
                  className={`hover:bg-gray-50 ${isHighestDiscountSupplier(supplier) ? 'bg-blanchedalmond' : ''}`} // Highlight highest discount suppliers
                >
                  <td className="py-2 px-4 border">{supplier.supCode}</td>
                  <td className="py-2 px-4 border">{supplier.SupplierName}</td>
                  <td className="py-2 px-4 border">{supplier.ContactInfo}</td>
                  <td className="py-2 px-4 border">{supplier.DeliveryItem}</td>
                  <td className="py-2 px-4 border">{supplier.ItemPrice}</td>
                  <td className="py-2 px-4 border">{supplier.Discount}</td>
                  <td className="py-2 px-4 border">
                    {/* Show "Generate Report" button only for the highest discount suppliers */}
                    {isHighestDiscountSupplier(supplier) && (
                      <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => navigate(`/StockReport/${supplier._id}`)}>
                        Generate Report
                      </button>
                    )}
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(supplier._id)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(supplier._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border text-center" colSpan="7">No suppliers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierDashboard;
