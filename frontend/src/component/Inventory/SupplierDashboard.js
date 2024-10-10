import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/addSupplier.css'; // CSS file 
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg';

const SupplierDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/suppliers/');
        setSuppliers(response.data);
        setFilteredSuppliers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching suppliers');
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const getHighestDiscountPerCategory = (suppliersList) => {
    const groupedSuppliers = suppliersList.reduce((groups, supplier) => {
      const category = supplier.DeliveryItem;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(supplier);
      return groups;
    }, {});

    return Object.values(groupedSuppliers).map(group => {
      return group.reduce((highest, current) =>
        parseFloat(current.Discount) > parseFloat(highest.Discount) ? current : highest
      );
    });
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = suppliers.filter(supplier =>
      supplier.supCode.toLowerCase().includes(lowerCaseQuery) ||
      supplier.ContactInfo.toString().includes(lowerCaseQuery) ||
      supplier.DeliveryItem.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]);

  const handleDelete = async (supId) => {
    const confirmed = window.confirm('Are you sure you want to delete this supplier?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${supId}`);
      setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== supId));
      alert('Supplier deleted successfully');
    } catch (err) {
      alert('Failed to delete supplier');
    }
  };

  const handleEdit = (supId) => {
    navigate(`/addSupplier/${supId}`);
  };

  const highestDiscountSuppliers = getHighestDiscountPerCategory(filteredSuppliers);

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
    <div className="flex min-h-screen"> {/* Flexbox with full screen height */}
      <div className="w-1/6 bg-gray-800 text-white p-4"> {/* Sidebar with reduced width */}
        {/* <div className="logo mb-4">
          <img src={Logo} alt="Tannoy Electricals Logo" className="w-24" /><br />
          <h2 className="text-lg">Tannoy Electricals</h2>
        </div> */}
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

      <div className="flex-1 p-4">
        <header className="mb-4">
          <input
            type="text"
            placeholder="Search by Supplier Code or Contact Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </header>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <h2 className="text-xl font-semibold mb-4">Supplier Details</h2>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Supplier Code</th>
              <th className="border border-gray-300 p-2">Supplier Name</th>
              <th className="border border-gray-300 p-2">Contact Info</th>
              <th className="border border-gray-300 p-2">Delivery Item</th>
              <th className="border border-gray-300 p-2">Item Price</th>
              <th className="border border-gray-300 p-2">Discount</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map(supplier => (
                <tr
                  key={supplier._id}
                  style={{
                    backgroundColor: isHighestDiscountSupplier(supplier) ? 'blanchedalmond' : 'inherit'
                  }}
                >
                  <td className="border border-gray-300 p-2">{supplier.supCode}</td>
                  <td className="border border-gray-300 p-2">{supplier.SupplierName}</td>
                  <td className="border border-gray-300 p-2">{supplier.ContactInfo}</td>
                  <td className="border border-gray-300 p-2">{supplier.DeliveryItem}</td>
                  <td className="border border-gray-300 p-2">{supplier.ItemPrice}</td>
                  <td className="border border-gray-300 p-2">{supplier.Discount}</td>
                  <td className="border border-gray-300 p-2">
                    {isHighestDiscountSupplier(supplier) && (
                      <button className="bg-blue-500 text-white rounded px-2 py-1 mr-1" onClick={() => navigate(`/StockReport/${supplier._id}`)}>
                        Generate Report
                      </button>
                    )}
                    <button className="bg-yellow-500 text-white rounded px-2 py-1 mr-1" onClick={() => handleEdit(supplier._id)}>Edit</button>
                    <button className="bg-red-500 text-white rounded px-2 py-1" onClick={() => handleDelete(supplier._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center border border-gray-300 p-2">No suppliers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierDashboard;
