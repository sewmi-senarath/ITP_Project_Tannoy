import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams to get productId from the URL
import axios from 'axios';
import productImage from '../../images/product.jpeg'; // Adjust the path to your image file
import '../../styles/product.css';

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
  const [formErrors, setFormErrors] = useState({
    ProductCode: '', // Initialize error state
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

    // Add validation for ProductCode
    if (name === "ProductCode") {
      const regex = /^[a-zA-Z0-9]{0,6}$/; // Allow only alphanumeric, max 6 characters
      if (!regex.test(value)) {
        setFormErrors({
          ...formErrors,
          ProductCode: "Product Code must be up to 6 alphanumeric characters.",
        });
        return; // Stop processing if validation fails
      } else {
        setFormErrors({
          ...formErrors,
          ProductCode: "", // Clear error if valid
        });
      }
    }

    // Update form data
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
        navigate('/productDashboard');
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
          {/* Product Code Input */}
          <div className="form-group">
            <label htmlFor="ProductCode">Product Code:</label>
            <input
              type="text"
              id="ProductCode"
              name="ProductCode"
              placeholder="Enter Product Code"
              value={formData.ProductCode}
              onChange={handleInputChange}
              maxLength="6" // Limit input to 4 characters
              required
              disabled={!!productId}
            />
            {formErrors.ProductCode && (
              <p className="error-message">{formErrors.ProductCode}</p> // Show error if validation fails
            )}
          </div>

          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="ProductName">Product Name:</label>
            <select
              id="ProductName"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Product</option>
              <option value="Holders">Holders</option>
              <option value="Junction Boxes">Junction Boxes</option>
              <option value="Sunk Boxes">Sunk Boxes</option>
              <option value="Double Holder">Double Holder</option>
              <option value="Round Block">Round Block</option>
              <option value="Celling Rose">Celling Rose</option>
            </select>
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
            <select
              id="ProductCategory"
              name="ProductCategory"
              value={formData.ProductCategory}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Electrical Enclosures">Electrical Enclosures</option>
              <option value="Electrical Fixtures">Electrical Fixtures</option>
              <option value="Wiring Boxes & Enclosures">Wiring Boxes & Enclosures</option>
              <option value="Lighting Fixtures & Components">Lighting Fixtures & Components</option>
            </select>
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
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  handleInputChange(e); // Call the input handler only if the value is valid
                }
              }}
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
