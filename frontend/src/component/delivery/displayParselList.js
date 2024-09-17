import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/dispalyList.css'; // Assuming you'll add custom styles to match the design

const URL = "http://localhost:5000/deliverParsel";

// Function to handle data fetching
const fetchHandler = async () => {
  try {
    const response = await axios.get(URL); // Axios request to fetch data
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null if there's an error
  }
};

function DisplayParselList() {
  const [parselData, setParselData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Loading state to show while data is fetched
  const [error, setError] = useState(false); // Error state for handling failures

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchHandler()
      .then((data) => {
        if (data && data.parcels) {
          setParselData(data.parcels); // Corrected to 'parcels' from API
          setLoading(false); // Stop loading after fetching
        } else {
          setLoading(false); // Stop loading if no data
          setError(true); // Set error if data is missing
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true); // Handle any errors
      });
  }, []);

  // Placeholder functions for Update and Delete (you'll need to implement actual functionality)
  const handleUpdate = (id) => {
    console.log(`Update button clicked for parcel with ID: ${id}`);
    // You can add your update logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete button clicked for parcel with ID: ${id}`);
    // You can add your delete logic here
  };

  return (
    <div className="container">
      <h1>All Delivery Requests</h1>
      {loading ? ( // Show a loading message while data is being fetched
        <p>Loading parcels...</p>
      ) : error ? ( // Show an error message if something went wrong
        <p>Failed to load parsel data. Please try again.</p>
      ) : parselData.length > 0 ? ( // Render parcels if data is available
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
                    onClick={() => handleUpdate(parsel._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(parsel._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No parsel data available</p> // Show a message if there's no data
      )}
    </div>
  );
}

export default DisplayParselList;
