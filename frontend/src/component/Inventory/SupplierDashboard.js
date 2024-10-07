import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import '../../styles/addSupplier.css'; // CSS file 
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
    <div className="employee-dashboard">
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Tannoy Electricals Logo" /><br />
          <h2>Tannoy Electricals</h2>
        </div>
        <ul className="nav-links">
          <li><a href="/productDashboard">Product Details</a></li>
          <li><a href="/Addproduct">Add Product</a></li>
          <li><a href="/supplierdashboard">Supplier details</a></li>
          <li><a href="/Addsupplier">Add Supplier</a></li>
          <li><a href="/stockDashboard">Stock Details</a></li>
          <li><a href="/addStock">Add Stock</a></li>
          <li><a href="/stock-add">Add Inquiry</a></li>
        </ul>
        <div className="profile">
          <img src={manager} alt="Manager Photo" />
          <p>Supply Manager</p>
          <p>supplymanager@tannoy.com</p>
        </div>
        <ul className="settings">
          <li><a href="#">Settings</a></li>
          <li><a href="#">Log out</a></li>
        </ul>
      </div>

      <div className="main-content">
        <header>
          <input
            type="text"
            placeholder="Search by Supplier Code or Contact Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </header>
        <h1>Dashboard</h1>
        <h2>Supplier Details</h2>

        <table>
          <thead>
            <tr>
              <th>Supplier Code</th>
              <th>Supplier Name</th>
              <th>Contact Info</th>
              <th>Delivery Item</th>
              <th>Item Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map(supplier => (
                <tr
                  key={supplier._id}
                  style={{
                    backgroundColor: isHighestDiscountSupplier(supplier) ? 'blanchedalmond' : 'inherit' // Highlight highest discount suppliers
                  }}
                >
                  <td>{supplier.supCode}</td>
                  <td>{supplier.SupplierName}</td>
                  <td>{supplier.ContactInfo}</td>
                  <td>{supplier.DeliveryItem}</td>
                  <td>{supplier.ItemPrice}</td>
                  <td>{supplier.Discount}</td>
                  <td>
                    {/* Show "Generate Report" button only for the highest discount suppliers */}
                    {isHighestDiscountSupplier(supplier) && (
                      <button className="report-btn" onClick={() => navigate(`/StockReport/${supplier._id}`)}>
                        Generate Report
                      </button>
                    )}
                    <button className="edit-btn" onClick={() => handleEdit(supplier._id)}>Edit</button><br /><br />
                    <button className="delete-btn" onClick={() => handleDelete(supplier._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No suppliers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierDashboard;
