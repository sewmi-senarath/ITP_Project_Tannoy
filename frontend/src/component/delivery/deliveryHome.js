import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/deliveryHome.css" // Import the CSS file


const DeliveryHome = () => {
  const navigate = useNavigate();

  // Function to handle redirection to the Parcel List page
  const handleDeliveryClickView = () => {
    navigate("/parsel-list"); // Navigates to the displayParselList page
  };

  const handleDeliveryClickAdd = () => {
    navigate("/Add-parsel"); // Navigates to the displayParselList page
  };

  return (
    <div className="home-wrapper">
      <h2 className="title">Quick Track Your Package</h2>
      <p className="subtitle">Fast & Free Shipping #Wheneverthingseasier</p>
      <input
        type="text"
        placeholder="Enter Your Tracking number here..."
        className="input-box"
      />
      <div className="button-wrapper">
        <button className="button button-primary" onClick={handleDeliveryClickAdd}>Add Delivery Request</button>
        <button className="button" onClick={handleDeliveryClickView}>
          View all delivery
        </button>
      </div>
    </div>
  );
};

export default DeliveryHome;
