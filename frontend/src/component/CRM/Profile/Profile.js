import React, { useState, useEffect } from "react";
import axios from "axios";
import './Profile.css'; // Import the CSS specific to this component

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    nicNumber: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch user data when component is mounted
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/getuser");
        setUser({
          name: data.name,
          email: data.email,
          address: data.address || "",
          contactNumber: data.phone || "",
          nicNumber: data.nic || "",
        });
      } catch (error) {
        setMessage("Error fetching user data");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="profile-container">
      <h2>Hello {user.name},</h2>
      {message && <p>{message}</p>}
      <div className="profile-section">
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ffavpng.com%2Fpng_view%2Fuser-avatar-united-states-avatar-organization-information-png%2FfJaY9g9i"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <label>Name</label>
          <p>{user.name}</p>

          <label>Email</label>
          <p>{user.email}</p>

          <label>Address</label>
          <p>{user.address}</p>

          <label>Contact Number</label>
          <p>{user.contactNumber}</p>

          <label>NIC Number</label>
          <p>{user.nicNumber}</p>

          <button onClick={() => window.location.href = '/edit-profile'}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
