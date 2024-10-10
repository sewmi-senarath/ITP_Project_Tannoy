import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import StockImage from '../../images/stock-img.jpg'; // Adjust to your image path

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
  const [isEditMode, setIsEditMode] = useState(false);
  const { itemId } = useParams();
  const navigate = useNavigate();

  // Fetch product data if in edit mode
  useEffect(() => {
    if (itemId) {
      setIsEditMode(true);
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/items/${itemId}`);
          setFormData(response.data);
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

    // Validation for itemCode: only allow letters and numbers, and max length of 6
    if (name === 'itemCode') {
      const regex = /^[A-Za-z0-9]{0,6}$/;
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
        await axios.put(`http://localhost:5000/api/items/${itemId}`, formData);
        setMessage('Stock updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/items', formData);
        setMessage('Stock added successfully!');
      }
  
      navigate('/stockDashboard');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display a message for duplicate items
        setMessage(error.response.data.message);
      } else {
        console.error('Error saving stock:', error);
        setMessage('Error saving stock. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* White box spanning between header and footer */}
      <div className="flex-grow flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 mx-4 min-h-[calc(100vh-100px)]"> {/* Ensure the white box spans the area between header and footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Image Section */}
            <div className="md:w-1/2 p-4">
              <img className="w-full h-auto object-cover" src={StockImage} alt="Stock Image" />
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-4">
              <h1 className="text-2xl font-bold mb-6 text-center">
                {isEditMode ? 'Edit Stock' : 'Add New Stock'}
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                  <label htmlFor="itemCode" className="block text-gray-700">Item Code</label>
                  <input
                    type="text"
                    id="itemCode"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleChange}
                    placeholder="Enter Item Code"
                    required
                    disabled={isEditMode} // Disable editing item code in edit mode
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="itemName" className="block text-gray-700">Item Name</label>
                  <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="Enter Item Name"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="itemDescription" className="block text-gray-700">Item Description</label>
                  <textarea
                    id="itemDescription"
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleChange}
                    placeholder="Enter Item Description"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="itemCategory" className="block text-gray-700">Item Category</label>
                  <select
                    id="itemCategory"
                    name="itemCategory"
                    value={formData.itemCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Select Item Category</option>
                    <option value="Polyethylene Terephthalate">Polyethylene Terephthalate</option>
                    <option value="Polypropylene">Polypropylene</option>
                    <option value="Bio-Based Plastics">Bio-Based Plastics</option>
                    <option value="Polystyrene">Polystyrene</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="stockSize" className="block text-gray-700">Stock Size</label>
                  <input
                    type="number"
                    id="stockSize"
                    name="stockSize"
                    value={formData.stockSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 0 || value === "") {
                        handleChange(e);
                      }
                    }}
                    placeholder="Enter Stock Size"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="availability" className="block text-gray-700">Availability</label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : isEditMode ? 'Update Stock' : 'Add Stock'}
                </button>

                {message && <p className="mt-2 text-green-600 text-center">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStock;
