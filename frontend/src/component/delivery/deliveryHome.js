import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../component/delivery/deliveryHome.css"; 

const DeliveryHome = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState("");

  // Function to handle redirection to the Parcel List page with search query
  const handleDeliveryClickView = () => {
    console.log("View Delivery Clicked"); // Debugging log
    if (trackingNumber) {
      navigate(`/parsel-list?search=${trackingNumber}`); 
    } else {
      navigate("/parsel-list"); 
    }
  };

  const handleDeliveryClickAdd = () => {
    console.log("Add Delivery Clicked"); // Debugging log
    navigate("/Add-parsel"); 
  };

  // Function to handle pressing the Enter key in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter Key Pressed"); // Debugging log
      handleDeliveryClickView();
    }
  };

  return (
    <div id="home-wrapper">
      <h2 id="title">Quick Track Your Package</h2>
      <p id="subtitle">Fast & Free Shipping #Wheneverthingseasier</p>
      <input
        type="text"
        placeholder="Enter Your Tracking number here..."
        id="input-box"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)} 
        onKeyDown={handleKeyPress}  // Changed from onKe yPress to onKeyDown
      />
      <div id="button-wrapper">
        <button id="button-primary" onClick={handleDeliveryClickAdd}>
          Add Delivery Request
        </button>
        <button id="button" onClick={handleDeliveryClickView}>
          View all delivery
        </button>
      </div>
    </div>
  );
};

export default DeliveryHome;
