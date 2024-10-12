import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import Logo from '../../images/logo.jpeg';
import '../employee/employeeGenerateReport.css';

const EmployeeSalaryReport = () => {
  const [employees, setEmployees] = useState([]); // Hold employee data
  const [selectedEmployee, setSelectedEmployee] = useState(''); // Selected employee
  const [selectedMonth, setSelectedMonth] = useState(''); // Selected month
  const [reportData, setReportData] = useState(null); // Store report data (present/absent/OT/salary)
  const [errorMessage, setErrorMessage] = useState(''); // Error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch employee data from backend when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle form submission
  const handleGenerateReport = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !selectedMonth) {
      setErrorMessage('Please select both an employee and a month.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Fetch report data (attendance, present count, absent count, OT hours, salary)
    try {
      const response = await axios.get(
        `http://localhost:5000/api/attendance/report/${selectedEmployee}?month=${selectedMonth}`
      );

      setReportData(response.data); // Store the report data
    } catch (error) {
      console.error('Error generating report:', error);
      setErrorMessage('Error generating report.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate PDF
  const generatePdf = () => {
    const doc = new jsPDF();

    doc.addImage(Logo, 'jpeg', 20, 20, 50, 30); // Adjust logo dimensions as needed

    // Add title and header
    doc.setFontSize(20);
    doc.text(`TANNOY ELECTRICAL INDUSTRIES`, 80, 25);  // Title
    doc.text(`Salary Report for ${selectedEmployee}`, 80, 35);  // Title
    doc.setFontSize(18);
    doc.text(`Month: ${selectedMonth}`, 80, 45); // Month
    doc.text(`Employee ID: ${selectedEmployee}`, 80, 55); // Employee ID

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 65, 200, 65); // X1, Y1, X2, Y2 for the line

    // Add Attendance Data
    doc.setFontSize(16);
    doc.text(`Present Days: ${reportData.presentCount}`, 30, 75);
    doc.text(`Absent Days: ${reportData.absentCount}`, 30, 85);
    doc.text(`OT Hours: ${reportData.otHours}`, 30, 95);
    doc.text(`EPF: ${reportData.epfAmount}`, 30, 105);
    doc.text(`ETF: ${reportData.etfAmount}`, 30, 115);
    doc.text(`Gross Salary: Rs.${reportData.totalSalary}`, 30, 125);

    // Add horizontal line
    doc.setLineWidth(0.2);
    doc.line(5, 128, 150, 128); // X1, Y1, X2, Y2 for the line

    doc.setFontSize(17);
    doc.text(`NET SALARY: Rs.${reportData.finalSalary}`, 30, 138);

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 270, 200, 270); // X1, Y1, X2, Y2 for the line

    // Add footer text
    doc.setFontSize(17);
    const currentDate = new Date().toLocaleDateString();
    doc.text('Sent by the employee manager', 10, 280); // Footer text
    doc.text(`Date: ${currentDate}`, 10, 290); // Current date

    // Save the PDF
    doc.save(`Salary_Report_${selectedEmployee}_${selectedMonth}.pdf`);
  };

  // Function to generate a shareable message
  const generateShareableMessage = () => {
    return generatePdf();
  };

  // Function to share via WhatsApp
  const shareOnWhatsApp = () => {
    const message = generateShareableMessage();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Function to share via Gmail
  const shareOnGmail = () => {
    const subject = encodeURIComponent("Attendance Report"); // Email subject
    const body = encodeURIComponent(generatePdf()); // Email body

    // Construct the mailto link
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    
    // Open the default email client (like Gmail) in a new window
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="report-container">
      <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 'bold' }}>Salary Report</h1>

      {/* Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Form */}
      <form onSubmit={handleGenerateReport}>
        {/* Employee Dropdown */}
        <div className="form-group">
          <label htmlFor="employee">Select Employee ID:</label>
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

        {/* Month Dropdown */}
        <div className="form-group">
          <label htmlFor="month">Select Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">--Select Month--</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="generate-button">
          {isLoading ? 'Generating Report...' : 'Generate Report'}
        </button>
      </form>

      {/* Display Report Data */}
      {reportData && (
        <div className="report-output">
          <h2 className="report-title">Preview of Salary Report for {selectedEmployee}</h2>
            <p className="report-data"><strong>Present Days:</strong> {reportData.presentCount}</p>
            <p className="report-data"><strong>Absent Days:</strong> {reportData.absentCount}</p>
            <p className="report-data"><strong>OT Hours:</strong> {reportData.otHours}</p>
            <p className="report-data"><strong>Gross Salary:</strong> RS.{reportData.totalSalary.toFixed(2)}</p>
            <p className="report-data"><strong>Salary after EPF reduction:</strong> RS.{reportData.epfAmount.toFixed(2)}</p>
            <p className="report-data"><strong>Salary after ETF reduction:</strong> RS.{reportData.etfAmount.toFixed(2)}</p>
            <p className="report-data"><strong>FINAL NET SALARY:</strong>RS.{reportData.finalSalary.toFixed(2)}</p>
          <br />

          {/* Generate PDF Button */}
          <button onClick={generatePdf} className="pdf-button">
            Download PDF
          </button>

          {/* Social Media Share Buttons */}
          <div className="social-media-buttons">
            <button onClick={shareOnWhatsApp} className="whatsapp-button">
              Share on WhatsApp
            </button>
            
            <button onClick={shareOnGmail} className="gmail-button">
              Share via Gmail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalaryReport;



