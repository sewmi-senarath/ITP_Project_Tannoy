import React, { useState } from 'react';
import './UpdateRecycleProduct.css'; 

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
            <div className='lebel-div'>
              <label htmlFor="machineName">Machine Name</label>
              <input
                type="text"
                id="machineName"
                name="machineName"
                value={formData.machineName}
                onChange={handleChange}
                placeholder="Enter machine name"
                required
              />
            </div>
            <div className='lebel-div'>
              <label htmlFor="machineCondition">Machine Status</label>
              <select
                id="machineCondition"
                name="machineCondition"
                value={formData.machineCondition}
                onChange={handleChange}
                required
              >
                <option>Select Condition</option>
                  <option value="BROKEN">BROKEN</option>
                  <option value="GOOD">GOOD</option>
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

  export default UpdateProductForm;