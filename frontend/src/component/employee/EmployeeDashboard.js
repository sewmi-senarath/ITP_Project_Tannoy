import React, { useState, useEffect } from 'react';
import '../../App.css';
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]); // State to hold employee data

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees'); // Adjust this URL to your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-dashboard">
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Tannoy Electricals Logo" /><br />
          <h2>Tannoy Electricals</h2>
        </div>
        <ul className="nav-links">
          <li><a href="#">Employee Details</a></li>
          <li><a href="/employee-dashboard">Add Employee</a></li>
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

      <div className="main-content">
        <header>
          <input type="text" placeholder="Search..." />
        </header>
        <h1>Dashboard</h1>
        <h2>Employee Details</h2>
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
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.dob}</td>
                <td>{employee.gender}</td>
                <td><img src={employee.photo} alt={`${employee.name} Photo`} /></td>
                <td>{employee.address}</td>
                <td>{employee.contactNumber}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.employeeType}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
//sewmi