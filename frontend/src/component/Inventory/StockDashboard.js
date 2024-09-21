import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import '../../App.css';
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg';
import { useNavigate } from "react-router-dom";

const StockDashboard = () => {
  const [items, setItems] = useState([]); // State to store inventory items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state for handling API errors
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredItems, setFilteredItems] = useState([]); // State to store filtered items
  const navigate = useNavigate(); 

  // Fetch items from the backend API when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items'); // Adjust the API route
        setItems(response.data); // Store the fetched items in the state
        setFilteredItems(response.data); // Initialize filtered items
        setLoading(false); // Set loading to false when data is loaded
      } catch (err) {
        setError('Error fetching items');
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchItems();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Handle search functionality
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase(); // Make search case-insensitive
    const filtered = items.filter(item =>
      item.itemCode.toLowerCase().includes(lowerCaseQuery) || // Search by item code
      item.itemCategory.toLowerCase().includes(lowerCaseQuery) // Search by item category
    );
    setFilteredItems(filtered); // Update the filtered items based on search query
  }, [searchQuery, items]); // Re-run the effect when search query or items change

  // Handle delete action
  const handleDelete = async (itemId) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`); // Use backticks for template literal
      setItems(prevItems => prevItems.filter(item => item._id !== itemId)); // Update state after deletion
      setFilteredItems(prevItems => prevItems.filter(item => item._id !== itemId)); // Update filtered items
      alert('Item deleted successfully');
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleEdit = (itemId) => {
    navigate(`/addStock/${itemId}`);  // Pass the item ID to the edit route
  };

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
          <p>Stock Manager</p>
          <p>stockmanager@tannoy.com</p>
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
            placeholder="Search by Item Code or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </header>
        <h1>Dashboard</h1>
        <h2>Inventory Details</h2>
        <table>
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Item Category</th>
              <th>Description</th>
              <th>Stock Size</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <tr key={item._id}>
                  <td>{item.itemCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemCategory}</td>
                  <td>{item.itemDescription || 'No description'}</td>
                  <td>{item.stockSize}</td>
                  <td>{item.availability ? 'Available' : 'Unavailable'}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(item._id)}>Edit</button><br /><br />
                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockDashboard;
