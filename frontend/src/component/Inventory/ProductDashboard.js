import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';  // Your CSS file
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg';
import { useNavigate } from "react-router-dom";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);  // Hold product data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');  // Error handling
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');  // Search query state
  const [filteredProducts, setFilteredProducts] = useState([]);  // Corrected line

  // Fetch product data from the backend API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');  // Adjust API route as needed
        setProducts(response.data);
        setFilteredProducts(response.data); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase(); // Make search case-insensitive
    const filtered = products.filter(product => 
      product.ProductCode.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);  // Run this effect when searchQuery or products changes

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleEdit = (productId) => {
    navigate(`/Addproduct/${productId}`);  // Pass the product ID correctly
  };
  
  const deleteProduct = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return; // If user cancels, do nothing

    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
      if (response.status === 200) {
        // Remove the product from the local state
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
        alert('Product deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
    }
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
          <li><a href="/supplierDashboard">Supplier details</a></li>
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
        <header>
          <input
            type="text"
            placeholder="Search by Product Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </header>
        <h1>Dashboard</h1>
        <h2>Product Details</h2>

        <table>
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Stock Size</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.ProductCode}</td>
                  <td>{product.ProductName}</td>
                  <td>{product.ProductDescription}</td>
                  <td>{product.stockSize}</td>
                  <td>{product.ProductCategory}</td>
                  <td>{product.availability || 'Unknown'}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(product._id)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDashboard;
