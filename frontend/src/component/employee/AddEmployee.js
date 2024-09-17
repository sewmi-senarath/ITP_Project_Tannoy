import React, { useState } from 'react';
import axios from 'axios';  // Ensure axios is installed: npm install axios


const AddEmployee = () => {
  // State to store input field values
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    address: '',
    contactNumber: '',
    email: '',
    position: '',
    department: '',
    employmentType: '',
    photo: null  // Assuming this is a file input
  });

  // Handles input changes for both text inputs and file input
  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'photo') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/employees', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Employee added:', response.data);  // Handle success
    } catch (error) {
      console.error('Error adding employee:', error.response.data);  // Handle error
    }
  };

  return (
    <div className="employee-dashboard">
      <div className="Add-main-content">
        <h1>Add Employee</h1>
        <form className="employee-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter full name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo:</label>
            <input type="file" id="photo" name="photo" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" placeholder="Enter address" value={formData.address} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Number:</label>
            <input type="text" id="contact" name="contact" placeholder="Enter contact number" value={formData.contactNumber} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position/Job Title:</label>
            <input type="text" id="position" name="position" placeholder="Enter job title" value={formData.position} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input type="text" id="department" name="department" placeholder="Enter department" value={formData.department} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="employeeType">Employee Type:</label>
            <select id="employeeType" name="employeeType" value={formData.employeeType} onChange={handleInputChange}>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
///sewmi