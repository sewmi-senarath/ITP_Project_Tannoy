import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./deliveryHeader"; // Import the Sidebar component
import "../../styles/dispalyList.css"; // Assuming you have styles for your page

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

  // Update the deleteHandler to accept _id as a parameter
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deliverParsel/${id}`);
      setParselData((prevParcels) => prevParcels.filter((parsel) => parsel._id !== id)); // Update the state to remove the deleted parcel
      navigate("/parsel-list"); // Redirect to parsel-list after deletion
    } catch (error) {
      console.error("Error deleting parcel:", error);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <div className="content">
          <button
            className="btn-back"
            onClick={() => navigate("/deliveryHome")}
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
                {parselData.map((parsel) => (
                  <tr key={parsel._id}>
                    <td>{parsel._id}</td>
                    <td>{parsel.fullName}</td>
                    <td>
                      <span className={`status ${parsel.status}`}>
                        {parsel.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/parsel-list/${parsel._id}`}>
                        <button className="btn btn-update">Update</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteHandler(parsel._id)} // Pass the _id to deleteHandler
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
