import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Plugin for creating table in PDF
import '../../styles/stockDashboard.css'; // CSS file
import manager from '../../images/manager.jpeg';
import { useNavigate } from 'react-router-dom';

const StockDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [restockQuantities, setRestockQuantities] = useState({}); // State for restock quantities
  const navigate = useNavigate();

  const lowStockThreshold = 10;

  // Fetch items when the component loads
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

  // Handle search query and availability filter
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    let filtered = items.filter(
      (item) =>
        item.itemCode.toLowerCase().includes(lowerCaseQuery) ||
        item.itemCategory.toLowerCase().includes(lowerCaseQuery)
    );

    if (availabilityFilter !== 'All') {
      filtered = filtered.filter((item) => item.availability === availabilityFilter);
    }

    setFilteredItems(filtered);
  }, [searchQuery, items, availabilityFilter]);

  // Handle item deletion
  const handleDelete = async (itemId) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      setFilteredItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      alert('Item deleted successfully');
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  // Handle item edit (redirect to edit page)
  const handleEdit = (itemId) => {
    navigate(`/addStock/${itemId}`);
  };

  // Handle restock action (update item quantity)
  const handleRestock = async (itemId) => {
    const restockQuantity = restockQuantities[itemId] || 0; // Get the restock quantity
    if (restockQuantity <= 0) {
      alert('Please enter a valid restock quantity.');
      return;
    }

    try {
      const itemToUpdate = items.find((item) => item._id === itemId);
      const newStockSize = itemToUpdate.stockSize + restockQuantity;

      // Update the stock size in the backend
      await axios.put(`http://localhost:5000/api/items/${itemId}`, {
        ...itemToUpdate,
        stockSize: newStockSize,
      });

      // Update the stock size in the frontend
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, stockSize: newStockSize } : item
        )
      );
      setFilteredItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, stockSize: newStockSize } : item
        )
      );
      alert('Stock updated successfully!');
    } catch (err) {
      console.error('Error updating stock:', err);
      alert('Failed to update stock.');
    }
  };

  // Handle restock input change
  const handleRestockInputChange = (itemId, value) => {
    setRestockQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: parseInt(value, 10), // Ensure value is an integer
    }));
  };

  // Generate PDF report for stock items
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text('Stock Inventory Report', 14, 16);

    const tableColumn = ['Item Code', 'Item Name', 'Item Category', 'Description', 'Stock Size', 'Availability'];
    const tableRows = [];

    filteredItems.forEach((item) => {
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
      startY: 20,
    });

    doc.save('Stock_Inventory_Report.pdf');
  };

  const lowStockItems = filteredItems.filter((item) => item.stockSize < lowStockThreshold);

  if (loading) {
    return <p className="text-center">Loading items...</p>;
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 h-screen text-white flex flex-col">
        <ul className="mt-6 space-y-2">
          <li>
            <a href="/stockDashboard" className="block py-2 px-4 hover:bg-gray-700">
              Stock Details
            </a>
          </li>
          <li>
            <a href="/addStock" className="block py-2 px-4 hover:bg-gray-700">
              Add Stock
            </a>
          </li>
          <li>
            <a href="/productDashboard" className="block py-2 px-4 hover:bg-gray-700">
              Product Details
            </a>
          </li>
          <li>
            <a href="/supplierDashboard" className="block py-2 px-4 hover:bg-gray-700">
              Supplier details
            </a>
          </li>
        </ul>

        <div className="mt-auto p-4">
          <img src={manager} alt="Manager Photo" className="h-16 w-16 rounded-full mx-auto" />
          <p className="text-center mt-2">Stock Manager</p>
          <p className="text-center text-gray-400">stockmanager@tannoy.com</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/settings" className="block py-2 px-4 hover:bg-gray-700">
                Settings
              </a>
            </li>
            <li>
              <a href="/home" className="block py-2 px-4 hover:bg-gray-700">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2 className="text-xl mt-2">Inventory Details</h2>

        {/* Filters */}
        <div className="filter-bar flex mt-4 mb-6">
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="border rounded p-2 mr-4"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <input
            type="text"
            className="border rounded p-2 flex-grow"
            placeholder="Search by Item Code or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Low stock notification */}
        {lowStockItems.length > 0 && (
          <div className="low-stock-notification mb-4">
            <p className="text-red-600">
              ⚠️ Warning: The following items are running low on stock! IDs: {lowStockItems.map((item) => item.itemCode).join(', ')}
            </p>
          </div>
        )}

        {/* Inventory Table */}
        <table className="min-w-full bg-white border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Item Code</th>
              <th className="border px-4 py-2">Item Name</th>
              <th className="border px-4 py-2">Item Category</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Stock Size</th>
              <th className="border px-4 py-2">Availability</th>
              <th className="border px-4 py-2">Restock Quantity</th> {/* Restock quantity column */}
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.itemCode}</td>
                <td className="border px-4 py-2">{item.itemName}</td>
                <td className="border px-4 py-2">{item.itemCategory}</td>
                <td className="border px-4 py-2">{item.itemDescription || 'No description'}</td>
                <td className="border px-4 py-2">{item.stockSize}</td>
                <td className="border px-4 py-2">{item.availability === 'Available' ? 'Available' : 'Unavailable'}</td>
                <td className="border px-4 py-2">
                  {/* Restock quantity input field */}
                  <input
                    type="number"
                    min="1"
                    value={restockQuantities[item._id] || ''}
                    onChange={(e) => handleRestockInputChange(item._id, e.target.value)}
                    className="border rounded p-1 mr-2"
                    placeholder="Restock Qty"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleRestock(item._id)}
                    className="bg-yellow-600 text-white px-2 py-1 rounded ml-2 hover:bg-yellow-700 transition duration-200"
                  >
                    Restock
                  </button>
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={generatePDFReport} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default StockDashboard;
