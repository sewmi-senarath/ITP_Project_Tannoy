import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SupplierImage from '../../images/suppiler-management.png';

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
      const isValid = /^[a-zA-Z0-9]{0,6}$/.test(value);
      if (!isValid) {
        setMessage('Supplier Code must be alphanumeric and up to 6 characters.');
        return;
      }
    }

    if (name === 'ContactInfo') {
      if (value.length > 10) {
        setMessage('Phone number must be exactly 10 digits.');
        return;
      }
      if (!/^[0-9]*$/.test(value)) {
        setMessage('Phone number must contain only digits.');
        return;
      } else {
        setMessage('');
      }
    }

    if (name === 'ItemPrice') {
      if (value && (isNaN(value) || parseFloat(value) < 0)) {
        setMessage('Item Price must be a positive number.');
        return;
      }
    }

    if (name === 'Discount') {
      if (value < 0) {
        setMessage('Discount cannot be negative.');
        return;
      }
      setMessage('');
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.ContactInfo.length !== 10) {
      setMessage('Phone number must be exactly 10 digits.');
      setIsSubmitting(false);
      return;
    }

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
    <div className="flex flex-col md:flex-row justify-center items-center p-6 bg-gray-100">
      <div className="md:w-1/2 p-4">
        <img className="w-full h-auto" src={SupplierImage} alt="Supplier Management" />
      </div>
      <div className="md:w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">{isEditMode ? 'Edit Supplier' : 'Add New Supplier'}</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {message && <p className="text-red-500 mb-4">{message}</p>}
          
          <div className="mb-4">
            <label className="block text-gray-700">Supplier Code</label>
            <input
              type="text"
              name="supCode"
              value={formData.supCode}
              onChange={handleChange}
              placeholder="Enter Supplier Code"
              required
              disabled={isEditMode}
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Supplier Name</label>
            <input
              type="text"
              name="SupplierName"
              value={formData.SupplierName}
              onChange={handleChange}
              placeholder="Enter Supplier Name"
              required
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="ContactInfo"
              value={formData.ContactInfo}
              onChange={handleChange}
              placeholder="Enter Contact Number"
              required
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Delivery Item</label>
            <select
              name="DeliveryItem"
              value={formData.DeliveryItem}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md p-2"
            >
              <option value="">Select the category</option>
              <option value="Plastic 1">Plastic 1</option>
              <option value="Plastic 2">Plastic 2</option>
              <option value="Plastic 3">Plastic 3</option>
              <option value="Plastic 4">Plastic 4</option>
              <option value="Plastic 5">Plastic 5</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Item Price</label>
            <input
              type="number"
              name="ItemPrice"
              value={formData.ItemPrice}
              onChange={handleChange}
              placeholder="Enter Item Price"
              required
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="Discount"
              value={formData.Discount}
              onChange={handleChange}
              placeholder="Enter Discount"
              required
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Supplier' : 'Add Supplier'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;

