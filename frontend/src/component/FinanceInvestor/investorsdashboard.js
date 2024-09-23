import React, { useState, useEffect } from 'react';
import '../../App.css'; // Assuming your CSS is here
import Logo from '../../images/logo.jpeg'; 
import manager from '../../images/manager.jpeg'; // Manager's image
import { useNavigate } from 'react-router-dom';
 // Import the Header component
import '../../styles/InvestorsDashboard.css';


function InvestorsDashboard  ()  {
  const [investors, setInvestors] = useState([]); // State to hold investor data
  const [error, setError] = useState(''); // To handle errors
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [filteredInvestors, setFilteredInvestors] = useState([]); // State to hold filtered results
  const navigate = useNavigate();

  // Fetch investor data from the backend API when the component mounts
  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/investors'); // Backend URL for investors
        if (!response.ok) {
          throw new Error('Failed to fetch investors');
        }
        const data = await response.json();
        console.log('Investors fetched:', data); // Check the fetched investors
        setInvestors(data); // Set the investors state with the fetched data
        setFilteredInvestors(data); // Initialize the filtered investors with all data
      } catch (error) {
        console.error('Error fetching investors:', error);
        setError('Could not fetch investor data');
      }
    };

    fetchInvestors(); // Fetch investors on component mount
  }, []); // Empty dependency array ensures it runs only once

  // UseEffect to filter investors as searchQuery changes (dynamic filtering)
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = investors.filter((investor) =>
        (investor.email?.toLowerCase() || '').includes(query) ||
        (investor.contactNumber?.toLowerCase() || '').includes(query) ||
        (investor.invId?.toLowerCase() || '').includes(query)
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
      const response = await fetch(`http://localhost:5000/api/investors/${investorId}`, {
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
    navigate(`/investor-dashboard/${investorId}`);
  };

  // Helper function to format the date (e.g., Date of Investment)
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
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
          <li><a href="/investor-portfolio">Investor Portfolio</a></li>
          <li><a href="/add-investor">Add Investor</a></li>
          <li><a href="/investorReport">Investor Report</a></li>
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
            placeholder="Search by email or contact number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </header>
        <h1>Investor Dashboard</h1>
        <h2>Investor Details</h2>

        {/* Display an error message if fetching fails */}
        {error && <p className="error-message">{error}</p>}

        {/* Investor Table */}
        <table>
          <thead>
            <tr>
              <th>Investor ID</th>
              <th>Name</th>
              <th>Date of Investment</th>
              <th>Email Address</th>
              <th>Contact Number</th>
              <th>Investment Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestors.length > 0 ? (
              filteredInvestors.map((investor) => (
                <tr key={investor._id}>
                  <td>{investor.invId}</td>
                  <td>{investor.name}</td>
                  <td>{formatDate(investor.investmentDate)}</td>
                  <td>{investor.email}</td>
                  <td>{investor.contactNumber}</td>
                  <td>{investor.investmentAmount}</td>
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
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No investors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorsDashboard;
