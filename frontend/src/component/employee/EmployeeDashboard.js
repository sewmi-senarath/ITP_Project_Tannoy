import React, { useState, useEffect } from 'react';
import '../employee/employee.css'
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
    <div className="flex flex-grow flex-row">
      {/* Sidebar Section */}
      <div className="w-64 min-w-64 bg-gray-800 text-white  flex-col">
        <div className="p-6">
          {/* <img src={Logo} alt="Tannoy Electricals Logo" className="h-16 mx-auto" /> */}
          <br /><br /><br />
        </div>
        <div className="flex flex-col items-center">
        <ul className="mt-6 space-y-10 flex-grow">
          <li><a href="/add-employee" className="block py-2 px-8 bg-green-600 text-white rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300">Add Employee</a></li>
          <li><a href="/mark-attendance" className="block py-2 px-8 bg-green-600 text-white rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300">Mark Attendance</a></li>
          <li><a href="/employeesalaryReport" className="block py-2 px-8 bg-green-600 text-white rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300">Salary Report</a></li>
        </ul>
        </div>
        <br />  <br />
  
        <div className="p-2 space-y-5">
          <img src={manager} alt="Manager Photo" className="h-16 w-16 rounded-full mx-auto" />
          <p className="mt-2 text-center text-lg font-semibold">Employee Manager</p>
          <p className="text-sm text-center text-gray-400">employeemanager@tannoy.com</p>
        </div>
        <br />  <br />

        <div className="flex flex-col items-center">
        <ul className="settings mt-auto space-y-10">
          <li><a href="/inquiries" className="block py-2 px-6 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 hover:shadow-lg transition duration-300">Make Inquiry</a></li>
          <li><a href="/home" className="block py-2 px-6 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 hover:shadow-lg transition duration-300">Log out</a></li>
        </ul>
        </div>
      </div>
  
      {/* Main Content Section */}
      <div className="flex-grow p-4 flex flex-col overflow-hidden">
        <header>
          <input
            type="text"
            placeholder="Search by employee ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </header>
  
        <div className="flex-grow overflow-auto">
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 'bold' }}>Dashboard</h1>
          <h2 style={{ fontFamily: 'Times New Roman, serif', fontSize: '28px', fontStyle: 'italic' }}><center>Employee Details</center></h2>
  
          {/* Add employee count */}
          <p style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
            Total Employees: {filteredEmployees.length}
          </p>
  
          {/* Display an error message if fetching fails */}
          {error && <p className="error-message">{error}</p>}
  
          {/* Employee Table */}
          <div className="overflow-x-auto">
          <table className="table-auto min-w-full">
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
                      <div className="flex flex-col space-x-2">
                        <button className="edit-btn bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleEdit(employee._id)}>
                          Edit
                        </button>
                        <button className="delete-btn bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteEmployee(employee._id)}>
                          Delete
                        </button>
                      </div>
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
      </div>
    </div>
  );
  
  
};

export default EmployeeDashboard;

