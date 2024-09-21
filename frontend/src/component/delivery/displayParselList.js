import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import axios from "axios";
import Sidebar from "./deliveryHeader"; // Import the Sidebar component
import "../../styles/dispalyList.css"; // Assuming you have styles for your page
import { useReactToPrint } from "react-to-print"; // Import react-to-print for generating PDF

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
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const location = useLocation(); // Hook to get the current URL
  const navigate = useNavigate(); // Hook for navigation
  const tableRef = useRef(); // Ref for the table data

  useEffect(() => {
    // Check for search query in URL parameters
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search") || "";
    setSearchQuery(searchParam); // Set the search query from URL

    fetchHandler().then((data) => {
      if (data && data.parcels) {
        const filteredParsels = data.parcels.filter((parsel) =>
          Object.values(parsel).some((field) =>
            field.toString().toLowerCase().includes(searchParam.toLowerCase())
          )
        );
        setParselData(filteredParsels);
        setNoResults(filteredParsels.length === 0);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    });
  }, [location.search]); // Re-run this effect when the URL search query changes

  const handlePrint = useReactToPrint({
    content: () => tableRef.current, // Reference the table content for print
    documentTitle: "Parsel Report",
    onAfterPrint: () => alert("Parsel Report Successfully Downloaded!"),
  });

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

          <button className="btn-back" onClick={handlePrint}>
            Download Report
          </button>

          <h1>All Delivery Requests</h1>

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Parcel Details"
          />
          <button onClick={() => navigate(`/parsel-list?search=${searchQuery}`)}>
            Search
          </button>

          {noResults ? (
            <p>No parcels found</p>
          ) : loading ? (
            <p>Loading parcels...</p>
          ) : error ? (
            <p>Failed to load parcel data. Please try again.</p>
          ) : parselData.length > 0 ? (
            <table ref={tableRef} className="table">
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
                        onClick={() => deleteHandler(parsel._id)}
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
