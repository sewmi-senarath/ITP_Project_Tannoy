// src/components/RecyclingProductsTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecycledProducts.css'; 

const RecyclingProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:5000/recyclingProducts")
        .then(response => {
          setProducts(response.data.RecyclingProducts);
        })
        .catch(error => console.log(error));
    };

    getData();
  }, []);

  const handleUpdate = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/recyclingProducts/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => console.log(error));
  };

  const handleSave = (updatedProduct) => {
    axios
      .put(`http://localhost:5000/recyclingProducts/${updatedProduct._id}`, updatedProduct)
      .then(response => {
        setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
        setIsEditing(false);
        setCurrentProduct(null);
      })
      .catch(error => console.log(error));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    
    <div>
      <div className='page-title-div'>
        <h2 className='page-title'>Recycled Products List</h2>
        <a href='/recycled-products' id='AddRecycleProductsButton-a'><button id='AddRecycleProductsButton'>Add Recycle Products</button></a>
      </div>
    <div id='table-div'>
      <table>
        <thead>
          <tr>
            <th>Raw Material Name</th>
            <th>Quantity</th>
            <th>Quality</th>
            <th>Date</th>
            <th>Stage</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter(product => product.status === 'COMPLETE')
            .map(product => (
            <tr key={product._id}>
              <td>{product.recyclingProductName}</td>
              <td>{product.quantity}</td>
              <td>{product.quality}</td>
              <td>{formatDate(product.date)}</td>
              <td>{product.stage}</td>
              <td>{product.status}</td>
              <td>
                <button id='update-button' onClick={() => handleUpdate(product)}>Update</button>
              </td>
              <td>
                <button id='delete-button' onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && currentProduct && (
        <UpdateProductForm 
          product={currentProduct} 
          onSave={handleSave} 
          onCancel={() => setIsEditing(false)} 
        />
      )}
    </div>
    </div>
  );
};

const UpdateProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...product });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="window">
      <div className="window-content">
        <h2 className='window-title'>Edit Product Details</h2>
        <form onSubmit={handleSubmit}>
          <div className='lebel-div'>
            <label className='window-lebel'>Raw Material Name:</label>
            <input className='input-fields'
              type="text"
              name="recyclingProductName"
              value={formData.recyclingProductName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='lebel-div'>
            <label className='window-lebel'>Quantity:</label>
            <input className='input-fields'
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className='lebel-div'>
            <label className='window-lebel'>Quality:</label>
            <input className='input-fields'
              type="text"
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              required
            />
          </div>
          <div className='lebel-div'>
            <label className='window-lebel'>Date:</label>
            <input className='input-fields'
              type="date"
              name="date"
              value={formatDate(formData.date)}
              onChange={handleChange}
              required
            />
          </div>
          <div className='lebel-div'>
            <label className='window-lebel'>Stage:</label>
            <select className='input-fields'
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              required >
              <option >Select Stage</option>
              <option value="SORTING">SORTING</option>
              <option value="CLEANING">CLEANING</option>
              <option value="MELTING">MELTING</option>
              <option value="SHREDDING">SHREDDING</option>
              <option value="PELLETIZING">PELLETIZING</option>
            </select>
          </div>
          <div className='lebel-div'>
            <label className='window-lebel'>Status:</label>
            <select className='input-fields'
              name="status"
              value={formData.status}
              onChange={handleChange}
              required >
              <option >Select Status</option>
              <option value="REJECT">REJECT</option>
              <option value="INPROGRESS">INPROGRESS</option>
              <option value="COMPLETE">COMPLETE</option>
            </select>
          </div>
          <div className='button-div'>
              <button className='window-save-button' type="submit">Save</button>
              <button className='window-cancel-button' type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default RecyclingProductsTable;
