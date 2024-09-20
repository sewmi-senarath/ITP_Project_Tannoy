import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from "axios";
import Sidebar from './deliveryHeader'; // Import the Sidebar component
import '../../styles/dispalyList.css'; // Assuming you have styles for your page

const URL = "http://localhost:5000/deliverParsel";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL); // Axios request to fetch data
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

function DisplayParselList() {
  const [parselData, setParselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        if (data && data.parcels) {
          setParselData(data.parcels);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <div className="content">
          <button
            className="btn-back" // Custom class for the back button
            onClick={() => navigate('/deliveryHome')} // Navigate to DeliveryHome when clicked
          >
            <span className="back-arrow">←</span> Back
          </button>
          <h1>All Delivery Requests</h1>
          {loading ? (
            <p>Loading parcels...</p>
          ) : error ? (
            <p>Failed to load parsel data. Please try again.</p>
          ) : parselData.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parselData.map((parsel, i) => (
                  <tr key={i}>
                    <td>{parsel._id}</td>
                    <td>{parsel.fullName}</td>
                    <td>
                      <span className={`status ${parsel.status}`}>
                        {parsel.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-view"
                        onClick={() => console.log(`View ${parsel._id}`)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-update"
                        onClick={() => console.log(`Update ${parsel._id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => console.log(`Delete ${parsel._id}`)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No parsel data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayParselList;
