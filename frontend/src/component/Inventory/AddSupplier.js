
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/addSupplier.css'; 
import SupplierImage from '../../images/suppiler-management.png'

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    supCode: '',
    SupplierName: '',
    ContactInfo: '',
    DeliveryItem: '',
    ItemPrice: '',
    Discount: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const { supplierId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (supplierId) {
      setIsEditMode(true);
      const fetchSupplier = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/suppliers/${supplierId}`);
          const supplierData = response.data;

          setFormData({
            ...supplierData,
            ItemPrice: supplierData.ItemPrice.toString(),
            Discount: supplierData.Discount.toString(),
          });
        } catch (error) {
          console.error('Error fetching supplier:', error);
          setMessage('Error loading supplier data.');
        }
      };
      fetchSupplier();
    }
  }, [supplierId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

     // Validate Supplier Code
  if (name === 'supCode') {
    // Check for alphanumeric and length
    const isValid = /^[a-zA-Z0-9]{0,6}$/.test(value); // Allows only letters and numbers and max 6 chars
    if (!isValid) {
      setMessage('Supplier Code must be alphanumeric and up to 6 characters.');
      return; // Stop updating if invalid
    }
  }

    // Allow typing in ContactInfo field freely and validate for exactly 10 digits later
    if (name === 'ContactInfo') {
      if (value.length > 10) {
        setMessage('Phone number must be exactly 10 digits.');
        return;
      }
      if (!/^[0-9]*$/.test(value)) {
        setMessage('Phone number must contain only digits.');
        return;
      } else {
        setMessage(''); // Clear error message if the input is valid
      }
    }

    // Validate ItemPrice to ensure only positive numbers are allowed
    if (name === 'ItemPrice') {
      if (value && (isNaN(value) || parseFloat(value) < 0)) {
        setMessage('Item Price must be a positive number.');
        return;
      }
    }

    // Validate Discount: Only positive numbers allowed
    if (name === 'Discount') {
      if (value < 0) {
        setMessage('Discount cannot be negative.');
        return;
      }
      setMessage(''); // Clear error message if the input is valid
    }


    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

     // Final validation: ensure phone number is exactly 10 digits
     if (formData.ContactInfo.length !== 10) {
      setMessage('Phone number must be exactly 10 digits.');
      setIsSubmitting(false);
      return;
    }

    // Final validation: ensure item price is positive
    if (formData.ItemPrice && parseFloat(formData.ItemPrice) < 0) {
      setMessage('Item Price must be a positive number.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/suppliers/${supplierId}`, formData);
        setMessage('Supplier updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/suppliers', formData);
        setMessage('Supplier added successfully!');
      }

      navigate('/supplierdashboard');
    } catch (error) {
      console.error('Error saving supplier:', error);
      setMessage('Error saving supplier. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-supplier-container">
      <div className="image-container">
        <img className="supplier-img" src={SupplierImage} alt="Supplier Management" />
      </div>
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
              disabled={isEditMode}
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
