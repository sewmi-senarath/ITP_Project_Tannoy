import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../delivery/addParsals.css';



function UpdateParselReq() {

  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  const [orders, setOrders] = useState([]);

  useEffect(()=> {
    getOrders();
  }, [])

  const getOrders = async () => {
    await axios.get("http://localhost:5000/order").then((res) => setOrders(res.data.order))
  }

  useEffect(()=>{
    console.log(orders)
  },[orders])

  useEffect(()=>{
    const fetchHandler = async ()=>{
      await axios
      .get(`http://localhost:5000/deliverParsel/${id}`)
      .then((res) => res.data)
      .then((data) => setInputs(data.parsel))
    };
    fetchHandler();
  },[id]);

  useEffect(()=>{
    console.log(inputs)
  }, [inputs])

  const sendRequest = async ()=>{
    await axios
    .put(`http://localhost:5000/deliverParsel/${id}`,{
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
    .then((res)=> res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history("/parsel-list"))
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Update Delivery Request</h1>
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
          <button type="submit" className="submit-button">
            Update
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
  )
}

export default UpdateParselReq;
