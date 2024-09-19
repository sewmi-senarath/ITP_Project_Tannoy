import React, { useState } from "react"
import Sidebar from "./deliveryHeader"
import ParselCSS from "../../styles/addParsals.css"
import { useNavigate } from "react-router-dom"
import axios from "axios";

function addDeliveryRequest() {
  const history = useNavigate()
  const [inputs, setInputs] = useState({
    fullName:"",
    phoneNo:"",
    email:"",
    address:"",
    postalCode:"",
    productType:"",
    productQty:"",
    status:"",
  });

  const handleChange = (e) => {
    setInputs((prevState)=> ({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs); 
    sendRequest().then(() => history('parsel-list'))
  };

  const sendRequest = async() => {
    await axios.post("http://localhost:5000/deliverParsel", {
      fullName: String(inputs.fullName),
      phoneNo: Number(inputs.phoneNo),
      email: String(inputs.email),
      address: String(inputs.address),
      postalCode: String(inputs.postalCode),
      productType: String(inputs.productType),
      productQty: Number(inputs.productQty),
      status: String(inputs.status),
    }).then(res => res.data);
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="form-container">
        <h1>Create New Delivery Request</h1>
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
              value={inputs.productQty}
              onChange={handleChange}
              placeholder="Enter Product Quantity"
              required
            />
          </label>
          <label>
            Status
            <select
              name="status"
              value={inputs.status}
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
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" onClick={() => history('/parsel-list')} className="back-button">Back</button>
        </form>
      </div>
    </div>
  );
}

export default addDeliveryRequest
