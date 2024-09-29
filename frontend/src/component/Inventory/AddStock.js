import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and getting productId from the URL
import '../../styles/addStock.css'; 


const AddStock = () => {
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    itemDescription: '',
    itemCategory: '',
    stockSize: '',
    availability: 'Available',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [message, setMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false); // Track if editing
  const { itemId } = useParams(); // Get productId from the URL
  const navigate = useNavigate(); 

  // Fetch product data if in edit mode
  useEffect(() => {
    if (itemId) {
      setIsEditMode(true); 
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/items/${itemId}`);
          setFormData(response.data); // Prepopulate form with existing data
        } catch (error) {
          console.error('Error fetching item:', error);
          setMessage('Error loading item data.');
        }
      };
      fetchProduct();
    }
  }, [itemId]);

  // Handle form input changes
const handleChange = (e) => {
  const { name, value } = e.target;

  // Validation for itemCode: only allow letters and numbers, and max length of 4
  if (name === 'itemCode') {
    const regex = /^[A-Za-z0-9]{0,6}$/; // Allow only letters and numbers, max 4 characters
    if (regex.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/items/${itemId}`, formData); // Update product
        setMessage('Stock updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/items', formData); // Add new product
        setMessage('Stock added successfully!');
      }

      navigate('/stockDashboard'); // Navigate to stock dashboard after success
    } catch (error) {
      console.error('Error saving stock:', error);
      setMessage('Error saving stock. Please try again.');
    } finally {
      setIsSubmitting(false); 
    }
  };
  

  return (
    <div className="add-stock-container">
      <div className="form-container">
        <h1>{isEditMode ? 'Edit Stock' : 'Add New Stock'}</h1>

        <form onSubmit={handleSubmit} className="stock-form">
          <div className="form-group">
            <label htmlFor="itemCode">Item Code</label>
            <input
              type="text"
              id="itemCode"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              placeholder="Enter Item Code"
              required
              disabled={isEditMode} // Disable editing item code in edit mode
            />
          </div>


<div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <select
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            >
              <option value="">Select Item Category</option>
              <option value="Plastic1">Plastic 1</option>
              <option value="Plastic2">Plastic 2</option>
              <option value="Plastic3">Plastic 3</option>
              <option value="Plastic4">Plastic 4</option>
              <option value="Plastic5">Plastic 5</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="itemDescription">Item Description</label>
            <textarea
              id="itemDescription"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
              placeholder="Enter Item Description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ItemCategory">Item Category</label>
            <select
              id="itemCategory"
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Item Category</option>
              <option value="PPolyethylene Terephthalate">Polyethylene Terephthalate</option>
              <option value="Polypropylene">Polypropylene</option>
              <option value="Bio-Based Plastics">Bio-Based Plastics</option>
              <option value="Polystyrene">Polystyrene</option>
              
            </select>
          </div>


        <div className="form-group">
        <label htmlFor="stockSize">Stock Size</label>
        <input
          type="number"
          id="stockSize"
          name="stockSize"
          value={formData.stockSize}
        onChange={(e) => {
        const value = e.target.value;
        // Ensure the value is not negative
        if (value >= 0 || value === "") {
         handleChange(e); // Allow change only if value is valid (non-negative or empty)
        }
       }}
       placeholder="Enter Stock Size"
       required
       min="0" // This disables manual entry of negative values via UI
       />
      </div>


          {/* Availability as a Dropdown */}
          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Stock' : 'Add Stock'}
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddStock;
