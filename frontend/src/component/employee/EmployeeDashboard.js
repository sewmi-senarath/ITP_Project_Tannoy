// export default EmployeeDashboard;
import React, { useState, useEffect } from 'react';
import '../../App.css'; // Assuming your CSS is here
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg'; // Manager's image
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]); // State to hold employee data
  const [error, setError] = useState(''); // To handle errors
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [filteredEmployees, setFilteredEmployees] = useState([]); // State to hold filtered results
  const navigate = useNavigate();

  // Fetch employee data from the backend API when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees'); // Backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        console.log('Employees fetched:', data); // Check the fetched employees
        setEmployees(data); // Set the employees state with the fetched data
        setFilteredEmployees(data); // Initialize the filtered employees with all data
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Could not fetch employee data');
      }
    };

    fetchEmployees(); // Fetch employees on component mount
  }, []); // Empty dependency array ensures it runs only once

  // UseEffect to filter employees as searchQuery changes (dynamic filtering)
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = employees.filter((employee) =>
        (employee.email?.toLowerCase() || '').includes(query) ||
        (employee.contactNumber?.toLowerCase() || '').includes(query) ||
        (employee.empId?.toLowerCase() || '').includes(query)
      );
      setFilteredEmployees(filtered); // Update filtered employees with the filtered result
    } else {
      setFilteredEmployees(employees); // If no search query, show all employees
    }
  }, [searchQuery, employees]);
  // Trigger filtering when searchQuery or employees change

  // Function to handle deleting an employee
  const deleteEmployee = async (employeeId) => {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmed) return; // If the user cancels, do nothing

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      // If deletion is successful, update the frontend state
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employeeId));
      setFilteredEmployees((prevFiltered) => prevFiltered.filter((emp) => emp._id !== employeeId)); // Remove from filtered list as well
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  // Handle the edit button to navigate to AddEmployee with the employee ID
  const handleEdit = (employeeId) => {
    navigate(`/add-employee/${employeeId}`);
  };

  // Helper function to format the date (e.g., Date of Birth)
  const formatDate = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString();
  };

  return (
    <div className="employee-dashboard">
      {/* Sidebar Section */}
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Tannoy Electricals Logo" /><br />
          <h2>Tannoy Electricals</h2>
        </div>
        <ul className="nav-links">
          <li><a href="/mark-attendance">Mark Attendance</a></li>
          <li><a href="/add-employee">Add Employee</a></li>
          <li><a href="#" className="active">Employee Overview</a></li>
        </ul>
        <div className="profile">
          <img src={manager} alt="Manager Photo" />
          <p>HR Manager</p>
          <p>hrmanager@tannoy.com</p>
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
        <h1>Dashboard</h1>
        <h2>Employee Details</h2>

        {/* Display an error message if fetching fails */}
        {error && <p className="error-message">{error}</p>}

        {/* Employee Table */}
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Photo</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Email Address</th>
              <th>Position/Job Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.empId}</td>
                  <td>{employee.name}</td>
                  <td>{formatDate(employee.dob)}</td>
                  <td>{employee.gender}</td>
                  <td>
                    {employee.photo ? (
                      <img
                        src={employee.photo}
                        alt={`${employee.name} Photo`}
                        className="employee-photo"
                      />
                    ) : (
                      <img
                        src="path/to/placeholder.png" // Use a placeholder image if no photo
                        alt="Placeholder"
                        className="employee-photo"
                      />
                    )}
                  </td>
                  <td>{employee.address}</td>
                  <td>{employee.contactNumber}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.employmentType}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(employee._id)}>Edit</button> 
                    <button
                      className="delete-btn"
                      onClick={() => deleteEmployee(employee._id)} // Call deleteEmployee on click
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{ textAlign: 'center' }}>
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
