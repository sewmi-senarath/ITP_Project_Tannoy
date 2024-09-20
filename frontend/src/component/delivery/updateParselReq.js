import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./deliveryHeader";

function UpdateParselReq() {
  const [inputs, setInputs] = useState(null); // Change initial state to null to handle loading state
  const history = useNavigate();
  const { id } = useParams(); // Ensure this matches your route (it could be 'id' or '_id')

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/deliverParsel/${id}`);
        if (res.data) {
          setInputs(res.data); // Set fetched data into inputs
        }
      } catch (error) {
        console.error("Error fetching parsel data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/deliverParsel/${id}`, {
        fullName: String(inputs.fullName),
        phoneNo: Number(inputs.phoneNo),
        email: String(inputs.email),
        address: String(inputs.address),
        postalCode: String(inputs.postalCode),
        productType: String(inputs.productType),
        productQty: Number(inputs.productQty),
        status: String(inputs.status),
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error updating delivery request:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/parsel-list"));
  };

  // Show loading state if data hasn't been fetched yet
  if (!inputs) {
    return <p>Loading...</p>; // Show a loading message or spinner
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="form-container">
        <h1>Update Delivery Request</h1>
        
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={inputs.fullName} 
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              name="phoneNo"
              value={inputs.phoneNo} 
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={inputs.email} 
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={inputs.address} 
              onChange={handleChange}
              placeholder="Enter Your Address"
              required
            />
          </label>
          <label>
            Postal Code
            <input
              type="text"
              name="postalCode"
              value={inputs.postalCode}
              onChange={handleChange}
              placeholder="Enter Your Postal Code"
              required
            />
          </label>
          <label>
            Product Type
            <input
              type="text"
              name="productType"
              value={inputs.productType} 
              onChange={handleChange}
              placeholder="Enter Product Type"
              required
            />
          </label>
          <label>
            Product Quantity
            <input
              type="number"
              name="productQty"
              value={inputs.productQty} // Make sure it's controlled
              onChange={handleChange}
              placeholder="Enter Product Quantity"
              required
            />
          </label>
          <label>
            Status
            <select
              name="status"
              value={inputs.status} // Ensure it's controlled
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Confirm Delivery">Confirm Delivery</option>
              <option value="Start Packaging">Start Packaging</option>
              <option value="On the way to Warehouse">On the way to Warehouse</option>
              <option value="Departure from Warehouse">Departure from Warehouse</option>
              <option value="Delivered">Delivered</option>
            </select>
          </label>
          <button type="submit" className="submit-button">Update</button>
          <button type="button" onClick={() => history('/parsel-list')} className="back-button">Back</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateParselReq;
