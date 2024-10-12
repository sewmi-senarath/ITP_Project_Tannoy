import React, { useState, useEffect } from 'react';
import '../../App.css'; // Assuming your CSS is here
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg'; // Manager's image
import { useNavigate } from 'react-router-dom';
import './InvestorsDashboard.css';
import './FinanceDashboard';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import jsPDF autoTable plugin


function InvestorsDashboard() {
  const [investors, setInvestors] = useState([]); // State to hold investor data
  const [error, setError] = useState(''); // To handle errors
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [filteredInvestors, setFilteredInvestors] = useState([]); // State to hold filtered results
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch investor data from the backend API when the component mounts
  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await fetch('http://localhost:5000/FinanceInvestor');
      


        if (!response.ok) {
          throw new Error('Failed to fetch investors');
        }
        const data = await response.json();
        console.log(data.investors); // Log the fetched data

        // Ensure data structure is correct
        setInvestors(data.investors); // Adjust if necessary
        setFilteredInvestors(data.investors); // Adjust if necessary
      } catch (error) {
        console.error('Error fetching investors:', error);
        setError('Could not fetch investor data');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []); // Empty dependency array ensures it runs only once

  // UseEffect to filter investors as searchQuery changes (dynamic filtering)
 useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = investors.filter((investor) =>
        (investor.gmail?.toLowerCase() || '').includes(query) || // Check for email
        (investor.nic?.toLowerCase() || '').includes(query) || // Check for NIC
        (investor._id?.toLowerCase() || '').includes(query) // Check for Investor ID
      );
      setFilteredInvestors(filtered); // Update filtered investors with the filtered result
    } else {
      setFilteredInvestors(investors); // If no search query, show all investors
    }
  }, [searchQuery, investors]);

  // Function to handle deleting an investor
  const deleteInvestor = async (investorId) => {
    const confirmed = window.confirm('Are you sure you want to delete this investor?');
    if (!confirmed) return; // If the user cancels, do nothing

    try {
      const response = await fetch(`http://localhost:5000/FinanceInvestor/${investorId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete investor');
      }

      // If deletion is successful, update the frontend state
      setInvestors((prevInvestors) => prevInvestors.filter((inv) => inv._id !== investorId));
      setFilteredInvestors((prevFiltered) => prevFiltered.filter((inv) => inv._id !== investorId)); // Remove from filtered list as well
      alert('Investor deleted successfully');
    } catch (error) {
      console.error('Error deleting investor:', error);
      alert('Failed to delete investor');
    }
  };

  // Handle the edit button to navigate to AddInvestor with the investor ID
  const handleEdit = (investorId) => {
    navigate(`/add-investor/${investorId}`); // Navigate to the edit page with the investor ID
  };

  // Helper function to format the date (e.g., Date of Investment)
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  // Generate PDF Function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Investor Details', 20, 10); // Title

// Add the table
doc.autoTable({
  head: [['ID', 'Name', 'DOB', 'Email', "Maiden Name", 'NIC', 'A/C Number', 'Bank', 'A/C Name', 'Invested Date', 'Amount', 'Percentage']],
  body: filteredInvestors.map(investor => [
    investor._id, 
    investor.name, 
    formatDate(investor.dob), 
    investor.gmail, 
    investor.maidenname, 
    investor.nic, 
    investor.accountnum, 
    investor.bankname, 
    investor.accname, 
    formatDate(investor.invtdate), 
    investor.amt, 
    investor.percentage
  ])
});

doc.save('investor_report.pdf'); // Save the generated PDF
};

  return (
    <div className="investor-dashboard">
      {/* Include the Header component here */}

      {/* Sidebar Section */}
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Tannoy Electricals Logo" /><br />
          <h2>Tannoy Electricals</h2>
        </div>
        <ul className="nav-links">
          <li><a href="/crmReport">Customer Report</a></li>
          <li><a href="/add-investor">Add Investor</a></li>
          <li><a href='/Financedashboard'>Finance Report</a></li>
        </ul>
        <div className="profile">
          <img src={manager} alt="Manager Photo" />
          <p>Investor Relations Manager</p>
          <p>investor.relations@tannoy.com</p>
        </div>
        <ul className="settings">
          <li><a href="#">Settings</a></li>
          <li><a href="#">Log out</a></li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <header>
          <input
            type="text"
            placeholder="Search by email or NIC number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </header>
        <h1>Investor Dashboard</h1>
        <h2>Investor Details</h2>

        {/* Display loading message while data is being fetched */}
        {loading && <p>Loading investor data...</p>}

        {/* Display an error message if fetching fails */}
        {error && <p className="error-message">{error}</p>}

        {/* Investor Table */}
        <table>
          <thead>
            <tr>
              <th>Investor ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Maidenname</th>
              <th>NIC Number</th>
              <th>A/C Number</th>
              <th>Bank</th>
              <th>A/C Name</th>
              <th>Invested Date</th>
              <th>Invested Amount</th>
              <th>Invested Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestors.length > 0 ? (
              filteredInvestors.map((investor) => (
                <tr key={investor._id}>
                  <td>{investor._id}</td>
                  <td>{investor.name}</td>
                  <td>{formatDate(investor.dob)}</td> {/* Format the date */}
                  <td>{investor.email}</td> {/* Correct this to gmail */}
                  <td>{investor.maidenname}</td>
                  <td>{investor.nic}</td>
                  <td>{investor.accountnum}</td>
                  <td>{investor.bankname}</td>
                  <td>{investor.accname}</td>
                  <td>{formatDate(investor.invtdate)}</td> {/* Format the date */}
                  <td>{investor.amt}</td>
                  <td>{investor.percentage}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(investor._id)}>Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteInvestor(investor._id)} // Call deleteInvestor on click
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" style={{ textAlign: 'center' }}>
                  {searchQuery ? 'No investors match your search query.' : 'No investors found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Add a button to generate PDF */}
        <button onClick={generatePDF} className="pdf-btn">Generate PDF</button>
      </div>
    </div>
  );
};

export default InvestorsDashboard;
