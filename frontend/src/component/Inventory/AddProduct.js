import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams to get productId from the URL
import axios from 'axios';
import productImage from '../../images/product.jpeg'; // Adjust the path to your image file
import '../../styles/product.css'


const AddProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Get the product ID from the URL
  const [formData, setFormData] = useState({
    ProductCode: '',
    ProductName: '',
    ProductDescription: '',
    ProductCategory: '',
    stockSize: '',
    availability: '',
  });
  const [isLoading, setIsLoading] = useState(true); // To show a loading indicator while fetching data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch product data by ID if we're editing
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
          setFormData({
            ProductCode: response.data.ProductCode,
            ProductName: response.data.ProductName,
            ProductDescription: response.data.ProductDescription || '',
            ProductCategory: response.data.ProductCategory,
            stockSize: response.data.stockSize,
            availability: response.data.availability || '',
          });
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setMessage('Failed to fetch product data.');
          setIsLoading(false);
        }
      } else {
        setIsLoading(false); // If we're adding a new product
      }
    };
    fetchProduct();
  }, [productId]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (productId) {
        // Update existing product
        await axios.put(`http://localhost:5000/api/products/${productId}`, formData);
        setMessage('Product updated successfully!');
        navigate('/productDashboard')
      } else {
        // Add new product
        await axios.post('http://localhost:5000/api/products', formData);
        setMessage('Product added successfully!');
       
      }
      navigate('/productDashboard'); // Redirect after submission
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage('Failed to save product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-dashboard">
      <div className="Add-main-content">
        <div className='title'>{productId ? 'Edit Product' : 'Add Product'}</div>
        <form className="product-form" onSubmit={handleSubmit}>
          
          {/* Product Code */}
          <div className="form-group">
            <label htmlFor="ProductCode">Product Code:</label>
            <input
              type="text"
              id="ProductCode"
              name="ProductCode"
              placeholder="Enter Product Code"
              value={formData.ProductCode}
              onChange={handleInputChange}
              required
              disabled={!!productId} 
            />
          </div>

          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="ProductName">Product Name:</label>
            <input
              type="text"
              id="ProductName"
              name="ProductName"
              placeholder="Enter Product Name"
              value={formData.ProductName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Product Description */}
          <div className="form-group">
            <label htmlFor="ProductDescription">Product Description:</label>
            <input
              type="text"
              id="ProductDescription"
              name="ProductDescription"
              placeholder="Enter Product Description"
              value={formData.ProductDescription}
              onChange={handleInputChange}
            />
          </div>

          {/* Product Category */}
          <div className="form-group">
            <label htmlFor="ProductCategory">Category:</label>
            <input
              type="text"
              id="ProductCategory"
              name="ProductCategory"
              placeholder="Enter Product Category"
              value={formData.ProductCategory}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Stock Size */}
          <div className="form-group">
            <label htmlFor="stockSize">Stock Size:</label>
            <input
              type="number"
              id="stockSize"
              name="stockSize"
              placeholder="Enter Stock Size"
              value={formData.stockSize}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Availability */}
          <div className="form-group">
            <label htmlFor="availability">Availability:</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Availability</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : productId ? 'Edit Product' : 'Add Product'}
          </button>
        </form>

        {message && <p>{message}</p>}

        {/* <img src={productImage} alt="Product" className="product-img" /> */}
      </div>
    </div>
  );
};

export default AddProduct;
