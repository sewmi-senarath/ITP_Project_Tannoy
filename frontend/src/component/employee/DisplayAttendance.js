import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';  // Import jsPDF for PDF generation
import 'jspdf-autotable';  // Import jsPDF-AutoTable for table generation
import '../../styles/DisplayAttendance.css'; // Add your styles here

const DisplayAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]); // Hold all attendance records
  const [uniqueDates, setUniqueDates] = useState([]); // Hold unique dates for the dropdown
  const [uniqueEmployees, setUniqueEmployees] = useState([]); // Hold unique employees for dropdown
  const [filteredRecords, setFilteredRecords] = useState([]); // Hold filtered records by selected filters
  const [selectedDate, setSelectedDate] = useState(''); // Track selected date
  const [selectedEmployee, setSelectedEmployee] = useState(''); // Track selected employee
  const [selectedStatus, setSelectedStatus] = useState(''); // Track selected status (Present/Absent)
  const [errorMessage, setErrorMessage] = useState(''); // For error handling

  // Fetch all attendance records on component mount
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance'); // Adjust the URL to your API
        const records = response.data;
        setAttendanceRecords(records);

        // Extract unique dates and employees from attendance records
        const uniqueDatesSet = new Set(records.map((record) => new Date(record.date).toLocaleDateString('en-CA')));
        const uniqueEmployeeSet = new Set(records.map((record) => record.empId));

        // Sort dates in ascending order
        const sortedUniqueDates = [...uniqueDatesSet].sort((a, b) => new Date(a) - new Date(b));
        setUniqueDates(sortedUniqueDates); // Set sorted unique dates
        setUniqueEmployees([...uniqueEmployeeSet]); // Set unique employees

        setFilteredRecords(records); // Initially show all records
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        setErrorMessage('Failed to load attendance records.');
      }
    };
    fetchAttendanceRecords();
  }, []);

  // Handle date filter
  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);
    filterRecords(selected, selectedEmployee, selectedStatus); // Filter based on new selection
  };

  // Handle employee filter
  const handleEmployeeChange = (e) => {
    const selected = e.target.value;
    setSelectedEmployee(selected);
    filterRecords(selectedDate, selected, selectedStatus); // Filter based on new selection
  };

  // Handle status filter (Present/Absent)
  const handleStatusChange = (e) => {
    const selected = e.target.value;
    setSelectedStatus(selected);
    filterRecords(selectedDate, selectedEmployee, selected); // Filter based on new selection
  };

  // Filter records based on selected date, employee, and status
  const filterRecords = (date, employee, status) => {
    let filtered = attendanceRecords;

    if (date) {
      filtered = filtered.filter((record) => {
        const recordDate = new Date(record.date).toLocaleDateString('en-CA');
        return recordDate === date;
      });
    }

    if (employee) {
      filtered = filtered.filter((record) => record.empId === employee);
    }

    if (status) {
      filtered = filtered.filter((record) => record.status === status);
    }

    setFilteredRecords(filtered); // Set the filtered records
  };

  // Function to generate the report PDF using jsPDF and jsPDF AutoTable
  const generateReport = () => {
    const doc = new jsPDF();

    // Set Title
    doc.text('Employee Attendance Report', 14, 10);

    // If any filter is applied, include that info in the report
    let yPosition = 20;
    if (selectedDate) {
      doc.text(`Date: ${selectedDate}`, 14, yPosition);
      yPosition += 10;
    }
    if (selectedEmployee) {
      doc.text(`Employee: ${selectedEmployee}`, 14, yPosition);
      yPosition += 10;
    }
    if (selectedStatus) {
      doc.text(`Status: ${selectedStatus}`, 14, yPosition);
      yPosition += 10;
    }

    // Prepare data for autoTable
    const tableColumn = ["Employee ID", "Date", "Status", "OT Hours"];
    const tableRows = filteredRecords.map((record) => [
      record.empId,
      new Date(record.date).toLocaleDateString(),
      record.status,
      record.otHours
    ]);

    // Add table to the PDF
    doc.autoTable({
      startY: yPosition + 10,
      head: [tableColumn],
      body: tableRows,
    });

    // Save the generated PDF
    doc.save('AttendanceReport.pdf');
  };

  return (
    <div className="attendance-table-container">
      <h1>Employee Attendance Records</h1>

      {/* Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Filter Dropdowns */}
      <div className="filter-container">
        {/* Date Dropdown */}
        <select className="date-select" value={selectedDate} onChange={handleDateChange}>
          <option value="">-- Select Date --</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>

        {/* Employee Dropdown */}
        <select className="employee-select" value={selectedEmployee} onChange={handleEmployeeChange}>
          <option value="">-- Select Employee --</option>
          {uniqueEmployees.map((empId, index) => (
            <option key={index} value={empId}>
              {empId}
            </option>
          ))}
        </select>

        {/* Status Dropdown */}
        <select className="status-select" value={selectedStatus} onChange={handleStatusChange}>
          <option value="">-- Select Status --</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      {/* Attendance Table */}
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
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
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

      {/* Generate Report Button */}
      <button className="generate-report-btn" onClick={generateReport}>
        Generate PDF Report
      </button>
    </div>
  );
};

export default DisplayAttendance;
