import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Plugin for creating table in PDF
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg';
import { useNavigate } from 'react-router-dom';

const StockDashboard = () => {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredItems, setFilteredItems] = useState([]); 
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items'); 
        setItems(response.data); 
        setFilteredItems(response.data); 
        setLoading(false); 
      } catch (err) {
        setError('Error fetching items');
        setLoading(false); 
      }
    };

    fetchItems();
  }, []); 

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase(); 

    let filtered = items.filter(item =>
      item.itemCode.toLowerCase().includes(lowerCaseQuery) || 
      item.itemCategory.toLowerCase().includes(lowerCaseQuery)
    );

    if (availabilityFilter !== 'All') {
      filtered = filtered.filter(item => item.availability === availabilityFilter);
    }

    setFilteredItems(filtered); 
  }, [searchQuery, items, availabilityFilter]); 

  const handleDelete = async (itemId) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`); 
      setItems(prevItems => prevItems.filter(item => item._id !== itemId)); 
      setFilteredItems(prevItems => prevItems.filter(item => item._id !== itemId)); 
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
    navigate(`/addStock/${itemId}`);
  };

  // Function to generate PDF report
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text('Stock Inventory Report', 14, 16);
    
    const tableColumn = ['Item Code', 'Item Name', 'Item Category', 'Description', 'Stock Size', 'Availability'];
    const tableRows = [];

    filteredItems.forEach(item => {
      const itemData = [
        item.itemCode,
        item.itemName,
        item.itemCategory,
        item.itemDescription || 'No description',
        item.stockSize,
        item.availability === 'Available' ? 'Available' : 'Unavailable',
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save('Stock_Inventory_Report.pdf');
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
        <h1>Dashboard</h1>
        <h2>Inventory Details</h2>

        {/* Filter Bar - Dropdown and Search Bar */}
        <div className="filter-bar">
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="availability-filter"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <input
            type="text"
            className="search-bar"
            placeholder="Search by Item Code or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>

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
                  <td>{item.availability === 'Available' ? 'Available' : 'Unavailable'}</td>
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

        {/* Generate Report Button */}
        <button className="generate-report-btn" onClick={generatePDFReport}>
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default StockDashboard;
