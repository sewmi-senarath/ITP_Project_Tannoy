import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../component/delivery/deliveryHome.css"; // Import the CSS file

const DeliveryHome = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState("");

  // Function to handle redirection to the Parcel List page with search query
  const handleDeliveryClickView = () => {
    if (trackingNumber) {
      navigate(`/parsel-list?search=${trackingNumber}`); // Navigates to displayParselList with search query
    } else {
      navigate("/parsel-list"); // Navigate without search query
    }
  };

  const handleDeliveryClickAdd = () => {
    navigate("/Add-parsel"); // Navigates to add parsel page
  };

  // Function to handle pressing the Enter key in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDeliveryClickView();
    }
  };

  return (
    <div className="home-wrapper">
      <h2 className="title">Quick Track Your Package</h2>
      <p className="subtitle">Fast & Free Shipping #Wheneverthingseasier</p>
      <input
        type="text"
        placeholder="Enter Your Tracking number here..."
        className="input-box"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)} // Update tracking number state
        onKeyPress={handleKeyPress} // Trigger search on Enter key press
      />
      <div className="button-wrapper">
        <button className="button button-primary" onClick={handleDeliveryClickAdd}>
          Add Delivery Request
        </button>
        <button className="button" onClick={handleDeliveryClickView}>
          View all delivery
        </button>
      </div>
    </div>
  );
};

export default DeliveryHome;
