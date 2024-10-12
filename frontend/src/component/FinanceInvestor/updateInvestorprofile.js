import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
//import Sidebar from './InvestorSidebar'; // Assuming you have a Sidebar component for navigation
import './UpdateInvestorProfile.css';


function UpdateInvestorProfile() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the investor profile based on the ID
  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/FinanceInvestor${id}`);
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
      .put(`http://localhost:5000/FinanceInvestor/${id}`, {
        
        name: String (inputs.name),
        dob: new Date (inputs.dob),
        gmail: String (inputs.email),
        maidenname: String (inputs.maidenname),
        nic: String (inputs.nic),
        accountnum: String (inputs.accountnum),
        bankname: String (inputs.bankname),
        accname: String (inputs.namaccnamee),
        invtdate: new Date (inputs.invtdate),
        amt:  Number (inputs.amt),
        percentage: Number (inputs.percentage),
  
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
    navigate('/InvestorsDashboard'); // Navigate to the list of investors
  };

  return (
    <div className="container">

      <div className="form-container">
        <h1>Update Investor Profile</h1>
        <form onSubmit={handleSubmit}>
        <label> Investor ID
  <input
    type="text"
    name="investorId"
    value={inputs.investorId || ''}
    onChange={handleChange}
    placeholder="Enter Investor ID"
    required
  />
</label>
<label>
  Name
  <input
    type="text"
    name="name"
    value={inputs.name || ''}
    onChange={handleChange}
    placeholder="Enter Name"
    required
  />
</label>
<label>
  Date of Birth
  <input
    type="date"
    name="dob"
    value={inputs.dob || ''}
    onChange={handleChange}
    required
  />
</label>
<label>
  Maiden Name
  <input
    type="text"
    name="maidenname"
    value={inputs.maidenname || ''}
    onChange={handleChange}
    placeholder="Enter Maiden Name"
    required
  />
</label>
<label>
  NIC
  <input
    type="text"
    name="nic"
    value={inputs.nic || ''}
    onChange={handleChange}
    placeholder="Enter NIC"
    required
  />
</label>
<label>
  Account Number
  <input
    type="text"
    name="accountnum"
    value={inputs.accountnum || ''}
    onChange={handleChange}
    placeholder="Enter Account Number"
    required
  />
</label>
<label>
  Bank Name
  <input
    type="text"
    name="bankname"
    value={inputs.bankname || ''}
    onChange={handleChange}
    placeholder="Enter Bank Name"
    required
  />
</label>
<label>
  Investment Date
  <input
    type="date"
    name="invtdate"
    value={inputs.invtdate || ''}
    onChange={handleChange}
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
  Amount
  <input
    type="number"
    name="amt"
    value={inputs.amt || ''}
    onChange={handleChange}
    placeholder="Enter Amount"
    required
  />
</label>
<label>
  Percentage
  <input
    type="number"
    name="percentage"
    value={inputs.percentage || ''}
    onChange={handleChange}
    placeholder="Enter Percentage"
    required
  />
</label>

          <button type="submit" className="submit-button">
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate('/InvestorsDashboard')}
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
