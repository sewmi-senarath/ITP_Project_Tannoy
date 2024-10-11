import React, { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import Sidebar from "./deliveryHeader" // Import the Sidebar component
import "../../component/delivery/dispalyList.css"
import "jspdf-autotable"
import jsPDF from "jspdf"

const URL = "http://localhost:5000/deliverParsel"

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL) // Axios request to fetch data
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    return null
  }
}

function DisplayParselList() {
  const [parselData, setParselData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const location = useLocation()
  const navigate = useNavigate()
  const tableRef = useRef()

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.parcels) {
        console.log(data.parcels)
        setParselData(data.parcels)
        setLoading(false)
      } else {
        setLoading(false)
        setError(true)
      }
    })
  }, [])

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deliverParsel/${id}`)
      setParselData(parselData.filter((parsel) => parsel._id !== id)) // Remove the deleted parcel from the state
    } catch (error) {
      console.error("Error deleting parcel:", error)
    }
  }

  const handlePrint = () => {
    const doc = new jsPDF()

    // Get the table rows and headers
    const tableHeaders = [
      [
        "Tracking ID",
        "Customer Name",
        "Address",
        "Product Type",
        "Product QTY",
        "Status",
      ],
    ]
    const tableRows = filteredParselData.map((parsel) => [
      parsel._id,
      parsel.fullName,
      parsel.address,
      parsel.productQty,
      parsel.productQty,
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
    const phoneNumber = "+94715331167"
    const message = `Your Order Request details are updated`
    const whatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`

    window.open(whatsAppUrl, "_blank")
  }

  // Filter parcels based on search query
  const filteredParselData = parselData.filter((parsel) =>
    Object.values(parsel).some((field) =>
      field.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div id="container">
      <Sidebar />

      <div id="main-content">
        {/* Total Order Requests Count Section */}
        <div id="order-count">
          <h2>Total Order Requests: {parselData.length}</h2>
        </div>
        <br></br>
        <button id="btn-back" onClick={() => navigate("/deliveryHome")}>
          <span id="back-arrow">←</span> Back
        </button>
        <button id="btn-back" onClick={handlePrint}>
          Download Report
        </button>
        <button id="btn-back" onClick={handleSendReport}>
          Send Report
        </button>

        <h1 id="heading">All Delivery Requests</h1>

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Parcel Details"
        />
        <br />

        {filteredParselData.length === 0 ? (
          <p>No parcels found</p>
        ) : loading ? (
          <p>Loading parcels...</p>
        ) : error ? (
          <p>Failed to load parcel data. Please try again.</p>
        ) : filteredParselData.length > 0 ? (
          <table id="table" ref={tableRef}>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Product QTY</th>
                <th>Product Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParselData.map((parsel) => (
                <tr key={parsel._id}>
                  <td>{parsel._id}</td>
                  <td>{parsel.fullName}</td>
                  <td>{parsel.address}</td>
                  <td>{parsel.productQty}</td>
                  <td>{parsel.productType}</td>
                  <td>
                    <span id={`status ${parsel.status}`}>{parsel.status}</span>
                  </td>
                  <td>
                    <Link to={`/parsel-list/${parsel._id}`}>
                      <button id="btn-update">Update</button>
                    </Link>
                    <button
                      id="btn-delete"
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
  )
}

export default DisplayParselList
