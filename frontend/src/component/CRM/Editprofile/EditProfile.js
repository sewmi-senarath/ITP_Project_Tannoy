import React, { useState, useEffect } from "react";
import axios from "axios";
import './EditProfile.css'; // Import the CSS specific to this component

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    nicNumber: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch user data when component is mounted
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/getuser");
        setUser({
          ...user,
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

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      await axios.patch("/api/updateuser", {
        name: user.name,
        email: user.email,
        address: user.address,
        contactNumber: user.contactNumber,
        nicNumber: user.nicNumber,
      });
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  const changePassword = async () => {
    if (user.newPassword !== user.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      await axios.patch("/api/changepassword", {
        oldPassword: user.oldPassword,
        password: user.newPassword,
      });
      setMessage("Password changed successfully");
    } catch (error) {
      setMessage("Error changing password");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Your Profile</h2>
      {message && <p>{message}</p>}
      <div className="profile-section">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
        <label>Email (cannot be changed)</label>
        <input
          type="email"
          name="email"
          value={user.email}
          disabled
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleInputChange}
        />
        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={user.contactNumber}
          onChange={handleInputChange}
        />
        <label>NIC Number</label>
        <input
          type="text"
          name="nicNumber"
          value={user.nicNumber}
          onChange={handleInputChange}
        />
        <button onClick={updateProfile}>Save Changes</button>
      </div>

      <div className="password-section">
        <h3>Change Password</h3>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={user.oldPassword}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={user.newPassword}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleInputChange}
        />
        <button onClick={changePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default EditProfile;
