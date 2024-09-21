import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and getting supplierId from the URL
import '../../styles/addSupplier.css'; // Custom CSS file for styling

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    supCode: '',
    SupplierName: '',
    ContactInfo: '', // Corrected spelling here
    DeliveryItem: '',
    ItemPrice: '', // Ensure this is treated as a string for form input
    Discount: '' // Ensure this is treated as a string for form input
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false); // Track if editing
  const { supplierId } = useParams(); // Get supplierId from the URL
  const navigate = useNavigate();

  // Fetch supplier data if in edit mode
  useEffect(() => {
    if (supplierId) {
      setIsEditMode(true); 
      const fetchSupplier = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/suppliers/${supplierId}`);
          const supplierData = response.data;

          // Ensure ItemPrice and Discount are handled as strings for input compatibility
          setFormData({
            ...supplierData,
            ItemPrice: supplierData.ItemPrice.toString(), // Convert number to string for input
            Discount: supplierData.Discount.toString(),  // Convert number to string for input
          });
        } catch (error) {
          console.error('Error fetching supplier:', error);
          setMessage('Error loading supplier data.');
        }
      };
      fetchSupplier();
    }
  }, [supplierId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/suppliers/${supplierId}`, formData); // Update supplier
        setMessage('Supplier updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/suppliers', formData); // Add new supplier
        setMessage('Supplier added successfully!');
      }

      navigate('/supplierdashboard'); // Navigate to supplier dashboard after success
    } catch (error) {
      console.error('Error saving supplier:', error);
      setMessage('Error saving supplier. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-supplier-container">
      <div className="form-container">
        <h1>{isEditMode ? 'Edit Supplier' : 'Add New Supplier'}</h1>

        <form onSubmit={handleSubmit} className="supplier-form">
          <div className="form-group">
            <label htmlFor="supCode">Supplier Code</label>
            <input
              type="text"
              id="supCode"
              name="supCode"
              value={formData.supCode}
              onChange={handleChange}
              placeholder="Enter Supplier Code"
              required
              disabled={isEditMode} // Disable editing supplier code in edit mode
            />
          </div>

          <div className="form-group">
            <label htmlFor="SupplierName">Supplier Name</label>
            <input
              type="text"
              id="SupplierName"
              name="SupplierName"
              value={formData.SupplierName}
              onChange={handleChange}
              placeholder="Enter Supplier Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ContactInfo">Contact Number</label>
            <input
              type="text"
              id="ContactInfo"
              name="ContactInfo"
              value={formData.ContactInfo}
              onChange={handleChange}
              placeholder="Enter Contact Number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="DeliveryItem">Delivery Item</label>
            <select
              id="DeliveryItem"
              name="DeliveryItem"
              value={formData.DeliveryItem}
              onChange={handleChange}
              required
            >
            <option value="">Select the category</option>
              <option value="Plastic 1">Plastic 1</option>
              <option value="Plastic 2">Plastic 2</option>
              <option value="Plastic 3">Plastic 3</option>
              <option value="Plastic 4">Plastic 4</option>
              <option value="Plastic 5">Plastic 5</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ItemPrice">Item Price</label>
            <input
              type="number"
              id="ItemPrice"
              name="ItemPrice"
              value={formData.ItemPrice}
              onChange={handleChange}
              placeholder="Enter Item Price"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Discount">Discount (%)</label>
            <input
              type="number"
              id="Discount"
              name="Discount"
              value={formData.Discount}
              onChange={handleChange}
              placeholder="Enter Discount"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Supplier' : 'Add Supplier'}
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;
