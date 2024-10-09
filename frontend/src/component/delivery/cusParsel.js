import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./deliveryHeader"; // Import the Sidebar component
import "../../component/delivery/dispalyList.css";
import "jspdf-autotable"
import jsPDF from "jspdf"

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
  const [filteredData, setFilteredData] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const tableRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.parcels) {
        setParselData(data.parcels);
        setFilteredData(data.parcels); // Initially display all parcels
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    });
  }, []);

  // Filter results based on search query
  useEffect(() => {
    if (searchQuery) {
      const filteredParsels = parselData.filter((parsel) =>
        Object.values(parsel).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredData(filteredParsels);
      setNoResults(filteredParsels.length === 0);
    } else {
      setFilteredData(parselData); // Show all parcels if no search query
      setNoResults(false);
    }
  }, [searchQuery, parselData]);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deliverParsel/${id}`);
      setParselData(parselData.filter((parsel) => parsel._id !== id)); // Remove the deleted parcel from the state
    } catch (error) {
      console.error("Error deleting parcel:", error);
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF()

    // Get the table rows and headers
    const tableHeaders = [
      [
        "Tracking ID",
        "Customer Name",
        "Address",
        "Product QTY",
        "Email",
        "Status",
      ],
    ]
    const tableRows = filteredParselData.map((parsel) => [
      parsel._id,
      parsel.fullName,
      parsel.address,
      parsel.productQty,
      parsel.email,
      parsel.status,
    ])

    // Add the title to the PDF
    doc.text("Parsel Report", 14, 16)

    // Add table to the PDF
    doc.autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 22,
    })

    // Save the PDF
    doc.save("Parsel_Report.pdf")
  }

  const handleSendReport = () => {
    const phoneNumber = "+94715331167";
    const message = `Your Order Request details are updated`;
    const whatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsAppUrl, "_blank");
  };

  return (
    <div id="container">
      <Sidebar />

      <div id="main-content">
        <button id="btn-back" onClick={() => navigate("/deliveryHome")}>
          <span id="back-arrow">←</span> Back
        </button>
        <button id="btn-back" onClick={handlePrint}>
          Download Report
        </button>

        <h1 id="heading">All Delivery Requests</h1>

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Real-time search
          type="text"
          name="search"
          placeholder="Search Parcel Details"
        />

        {noResults ? (
          <p>No parcels found</p>
        ) : loading ? (
          <p>Loading parcels...</p>
        ) : error ? (
          <p>Failed to load parcel data. Please try again.</p>
        ) : filteredData.length > 0 ? (
          <table id="table" ref={tableRef}>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Customer Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((parsel) => (
                <tr key={parsel._id}>
                  <td>{parsel._id}</td>
                  <td>{parsel.fullName}</td>
                  <td>
                    <span id={`status ${parsel.status}`}>{parsel.status}</span>
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
  );
}

export default DisplayParselList;
