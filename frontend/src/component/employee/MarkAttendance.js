import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../../styles/MarkAttendance.css'; // Your existing CSS

const MarkAttendance = () => {
  const [employees, setEmployees] = useState([]); // Hold employees data
  const [selectedEmployee, setSelectedEmployee] = useState(''); // Hold selected employee
  const [attendanceDate, setAttendanceDate] = useState(''); // Hold the date of attendance
  const [otHours, setOtHours] = useState(''); // Hold OT hours
  const [status, setStatus] = useState(''); // Hold present/absent status
  const [errorMessage, setErrorMessage] = useState(''); // Handle error messages
  const navigate = useNavigate(); // To navigate after form submission

  // Fetch employees from backend API when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees'); // Adjust the URL to your API
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation to ensure fields are filled
    if (!selectedEmployee || !attendanceDate || !status) {
      setErrorMessage('Please fill all required fields.');
      return;
    }

    // Submit attendance data to the backend
    try {
      const attendanceData = {
        empId: selectedEmployee,
        date: attendanceDate,
        status: status,
        otHours: otHours || 0 // If OT hours are empty, default to 0
      };

      await axios.post('http://localhost:5000/api/attendance', attendanceData); // Adjust URL for your API
      alert('Attendance submitted successfully!');
      
      // Clear the form fields after submission
      setSelectedEmployee('');
      setAttendanceDate('');
      setStatus('');
      setOtHours('');

      setErrorMessage(''); // Clear the error message after successful submission

      // Navigate to the display attendance page after success
      navigate('/displayattendance');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setErrorMessage('Error submitting attendance data.');
    }
  };

  return (
    <div className="attendance-container">
      <h1>Mark Attendance</h1>

      {/* Show error messages if any */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Attendance Form */}
      <form onSubmit={handleSubmit}>
        
        {/* Employee Dropdown */}
        <div className="form-group">
          <label htmlFor="employee">Select Employee:</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">--Select Employee--</option>
            {employees.map((employee) => (
              <option key={employee.empId} value={employee.empId}>
                {employee.empId} 
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="form-group">
          <label htmlFor="attendance-date">Select Date:</label>
          <input
            type="date"
            id="attendance-date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            required
          />
        </div>

        {/* OT Hours Input */}
        <div className="form-group">
          <label htmlFor="ot-hours">OT Hours (Optional):</label>
          <input
            type="number"
            id="ot-hours"
            placeholder="Enter OT hours"
            value={otHours}
            onChange={(e) => setOtHours(e.target.value)}
          />
        </div>

        {/* Status Radio Buttons */}
        <div className="form-group">
          <label>Status:</label>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                id="present"
                name="status"
                value="Present"
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              Present
            </label>

            <label>
              <input
                type="radio"
                id="absent"
                name="status"
                value="Absent"
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              Absent
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Submit Attendance</button>
      </form>
    </div>
  );
};

export default MarkAttendance;


