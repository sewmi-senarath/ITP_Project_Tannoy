import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';  //generating PDFs in the browser
import 'jspdf-autotable';  //create tables in the PDF
import '../employee/DisplayAttendance.css';

const DisplayAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]); 
  const [uniqueMonths, setUniqueMonths] = useState([]); 
  const [uniqueEmployees, setUniqueEmployees] = useState([]); 
  const [filteredRecords, setFilteredRecords] = useState([]); 
  const [selectedMonth, setSelectedMonth] = useState(''); 
  const [selectedEmployee, setSelectedEmployee] = useState(''); 
  const [selectedStatus, setSelectedStatus] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance');
        const records = response.data;
        setAttendanceRecords(records);

        // Extract unique months (format: YYYY-MM)
        const uniqueMonthsSet = new Set(records.map((record) => {
          const date = new Date(record.date);
          return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`; // Format to YYYY-MM
        }));

        const uniqueEmployeeSet = new Set(records.map((record) => record.empId));

        const sortedUniqueMonths = [...uniqueMonthsSet].sort(); // Sort by month-year
        setUniqueMonths(sortedUniqueMonths);
        setUniqueEmployees([...uniqueEmployeeSet]);
        setFilteredRecords(records); 
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        setErrorMessage('Failed to load attendance records.');
      }
    };
    fetchAttendanceRecords();
  }, []);

  const handleMonthChange = (e) => {
    const selected = e.target.value;
    setSelectedMonth(selected);
    filterRecords(selected, selectedEmployee, selectedStatus); 
  };

  const handleEmployeeChange = (e) => {
    const selected = e.target.value;
    setSelectedEmployee(selected);
    filterRecords(selectedMonth, selected, selectedStatus); 
  };

  const handleStatusChange = (e) => {
    const selected = e.target.value;
    setSelectedStatus(selected);
    filterRecords(selectedMonth, selectedEmployee, selected); 
  };

  const filterRecords = (month, employee, status) => {
    let filtered = attendanceRecords;

    if (month) {
      filtered = filtered.filter((record) => {
        const recordDate = new Date(record.date);
        const recordMonth = `${recordDate.getFullYear()}-${('0' + (recordDate.getMonth() + 1)).slice(-2)}`; // Format to YYYY-MM
        return recordMonth === month;
      });
    }

    if (employee) {
      filtered = filtered.filter((record) => record.empId === employee);
    }

    if (status) {
      filtered = filtered.filter((record) => record.status === status);
    }

    setFilteredRecords(filtered);
  };

  // Generate report function
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Employee Attendance Report', 14, 10);

    let yPosition = 20;
    if (selectedMonth) {
      doc.text(`Month: ${selectedMonth}`, 14, yPosition);
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

    const tableColumn = ["Employee ID", "Date", "Status", "OT Hours"];
    const tableRows = filteredRecords.map((record) => [
      record.empId,
      new Date(record.date).toLocaleDateString(),
      record.status,
      record.otHours,
    ]);

    doc.autoTable({
      startY: yPosition + 10,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('AttendanceReport.pdf');
  };

  return (
    <div className="attendance-table-container">
      <h1>Employee Attendance Records</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="filter-container">
        <select className="month-select" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">-- Select Month --</option>
          {uniqueMonths.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select className="employee-select" value={selectedEmployee} onChange={handleEmployeeChange}>
          <option value="">-- Select Employee --</option>
          {uniqueEmployees.map((empId, index) => (
            <option key={index} value={empId}>
              {empId}
            </option>
          ))}
        </select>

        <select className="status-select" value={selectedStatus} onChange={handleStatusChange}>
          <option value="">-- Select Status --</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

      </div>

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

      <button className="generate-report-btn" onClick={generateReport}>
        Generate PDF Report
      </button>
    </div>
  );
};

export default DisplayAttendance;

