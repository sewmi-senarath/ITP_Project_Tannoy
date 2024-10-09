import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductImage from '../../images/product-img.png';

const AddProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    ProductCode: '',
    ProductName: '',
    ProductDescription: '',
    ProductCategory: '',
    stockSize: '',
    availability: '',
    price: '',
  });
  const [formErrors, setFormErrors] = useState({
    ProductCode: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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
            price: response.data.price,
          });
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setMessage('Failed to fetch product data.');
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "ProductCode") {
      const regex = /^[a-zA-Z0-9]{0,6}$/;
      if (!regex.test(value)) {
        setFormErrors({
          ...formErrors,
          ProductCode: "Product Code must be up to 6 alphanumeric characters.",
        });
        return;
      } else {
        setFormErrors({
          ...formErrors,
          ProductCode: "",
        });
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (productId) {
        await axios.put(`http://localhost:5000/api/products/${productId}`, formData);
        setMessage('Product updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
        setMessage('Product added successfully!');
      }
      navigate('/productDashboard');
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full lg:w-4/5 xl:w-3/4 bg-white rounded-lg shadow-lg p-6 flex flex-wrap">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0">
          <img
            className="w-full h-auto object-cover rounded-lg" // Adjust width to full
            src={ProductImage}
            alt="Product"
            style={{ width: '1200px', height: '750px' }}  // Increased height
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">{productId ? 'Edit Product' : 'Add Product'}</h2> {/* Centered Title */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Product Code Input */}
              <div className="form-group">
                <label htmlFor="ProductCode" className="block text-gray-700">Product Code:</label>
                <input
                  type="text"
                  id="ProductCode"
                  name="ProductCode"
                  placeholder="Enter Product Code"
                  value={formData.ProductCode}
                  onChange={handleInputChange}
                  maxLength="6"
                  required
                  disabled={!!productId}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {formErrors.ProductCode && (
                  <p className="text-red-500 text-sm">{formErrors.ProductCode}</p>
                )}
              </div>

              {/* Product Name */}
              <div className="form-group">
                <label htmlFor="ProductName" className="block text-gray-700">Product Name:</label>
                <select
                  id="ProductName"
                  name="ProductName"
                  value={formData.ProductName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                <label htmlFor="ProductDescription" className="block text-gray-700">Product Description:</label>
                <input
                  type="text"
                  id="ProductDescription"
                  name="ProductDescription"
                  placeholder="Enter Product Description"
                  value={formData.ProductDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Product Category */}
              <div className="form-group">
                <label htmlFor="ProductCategory" className="block text-gray-700">Category:</label>
                <select
                  id="ProductCategory"
                  name="ProductCategory"
                  value={formData.ProductCategory}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                <label htmlFor="stockSize" className="block text-gray-700">Stock Size:</label>
                <input
                  type="number"
                  id="stockSize"
                  name="stockSize"
                  placeholder="Enter Stock Size"
                  value={formData.stockSize}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 0 || value === "") {
                      handleInputChange(e);
                    }
                  }}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Availability */}
              <div className="form-group">
                <label htmlFor="availability" className="block text-gray-700">Availability:</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Availability</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              {/* Price */}
              <div className="form-group">
                <label htmlFor="price" className="block text-gray-700">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value >= 0 || value === "") {
                      handleInputChange(e);
                    }
                  }}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <div className="form-group">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : (productId ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </form>
            {message && <p className="text-green-500 text-center mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
