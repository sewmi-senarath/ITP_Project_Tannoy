import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
//import Sidebar from './InvestorSidebar'; // Assuming you have a Sidebar component for navigation
import '../../styles/UpdateInvestorProfile.css';


function UpdateInvestorProfile() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the investor profile based on the ID
  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/investors/${id}`);
        setInputs(response.data.investor);
      } catch (error) {
        console.error('Error fetching investor profile:', error);
      }
    };
    fetchInvestor();
  }, [id]);

  // Send a PUT request to update the investor profile
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/api/investors/${id}`, {
        fullName: String(inputs.fullName),
        phoneNo: String(inputs.phoneNo),
        email: String(inputs.email),
        address: String(inputs.address),
        investmentAmount: Number(inputs.investmentAmount),
        investmentDate: String(inputs.investmentDate),
        status: String(inputs.status),
      })
      .then((res) => res.data);
  };

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    navigate('/investor-list'); // Navigate to the list of investors
  };

  return (
    <div className="container">

      <div className="form-container">
        <h1>Update Investor Profile</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={inputs.fullName || ''}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              name="phoneNo"
              value={inputs.phoneNo || ''}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={inputs.email || ''}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={inputs.address || ''}
              onChange={handleChange}
              placeholder="Enter Address"
              required
            />
          </label>
          <label>
            Investment Amount
            <input
              type="number"
              name="investmentAmount"
              value={inputs.investmentAmount || ''}
              onChange={handleChange}
              placeholder="Enter Investment Amount"
              required
            />
          </label>
          <label>
            Investment Date
            <input
              type="date"
              name="investmentDate"
              value={inputs.investmentDate || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status
            <select
              name="status"
              value={inputs.status || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </label>
          <button type="submit" className="submit-button">
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate('/investor-list')}
            className="back-button"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateInvestorProfile;
