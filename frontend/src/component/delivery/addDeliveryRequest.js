import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./deliveryHeader";

function AddDeliveryRequest() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    orderId: "",
    fullName: "",
    phoneNo: "",
    email: "",
    address: "",
    postalCode: "",
    productType: "",
    productQty: "",
    status: "",
  });

  const [orders, setOrders] = useState([]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/parsel-list"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/deliverParsel", {
        orderId: String(inputs.orderId),
        fullName: String(inputs.fullName),
        phoneNo: Number(inputs.phoneNo),
        email: String(inputs.email),
        address: String(inputs.address),
        postalCode: String(inputs.postalCode),
        productType: String(inputs.productType),
        productQty: Number(inputs.productQty),
        status: String(inputs.status),
      })
      .then((res) => res.data);
  };

  useEffect(()=> {
    getOrders();
  }, [])

  const getOrders = async () => {
    await axios.get("http://localhost:5000/order").then((res) => setOrders(res.data.order))
  }

  useEffect(()=>{
    console.log(orders);
  }, [orders])

  return (
    
    <div className="container">
      
      <div className="form-container">
        
        <h1>Create New Delivery Request</h1>
        <form onSubmit={handleSubmit}>

          <label htmlFor="order">Order</label>
          {orders && (
            <select id="orderId" name="orderId" onChange={handleChange} value={inputs.orderId}>
              {orders.map((order, index) => {
                return <option key={index} value={order._id}>{`${order.reciptNo} - ${order.productName} - ${order.deliveryType}`}</option>
                })
              }
           </select>
          )}
          

          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={inputs.fullName}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            required
          />

          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={inputs.phoneNo}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            placeholder="Enter Your Address"
            required
          />

          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={inputs.postalCode}
            onChange={handleChange}
            placeholder="Enter Your Postal Code"
            required
          />

          <label htmlFor="productType">Product Type</label>
          <input
            type="text"
            id="productType"
            name="productType"
            value={inputs.productType}
            onChange={handleChange}
            placeholder="Enter Product Type"
            required
          />

          <label htmlFor="productQty">Product Quantity</label>
          <input
            type="number"
            id="productQty"
            name="productQty"
            value={inputs.productQty}
            onChange={handleChange}
            placeholder="Enter Product Quantity"
            required
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
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

          <button type="submit" className="submit-button">
            Submit
          </button>
          <button
            type="button"
            onClick={() => history("/parsel-list")}
            className="back-button"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDeliveryRequest;
