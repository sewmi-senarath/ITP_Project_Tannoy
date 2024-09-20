import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/DisplayAttendance.css'; // Add your styles here

const DisplayAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]); // Hold attendance records

  // Fetch attendance data from backend API
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance'); // Adjust the URL to your API
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };
    fetchAttendanceRecords();
  }, []);

  return (
    <div className="attendance-table-container">
      <h1>Employee Attendance Records</h1>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>OT Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.empId}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.status}</td>
                <td>{record.otHours}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default DisplayAttendance;

