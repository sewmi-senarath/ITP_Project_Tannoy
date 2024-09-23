import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import '../../styles/employeeGenerateReport.css';

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
    doc.text(`Attendance Report for ${selectedEmployee}`, 10, 10);
    doc.text(`Present Days: ${reportData.presentCount}`, 10, 20);
    doc.text(`Absent Days: ${reportData.absentCount}`, 10, 30);
    doc.text(`OT Hours: ${reportData.otHours}`, 10, 40);
    doc.text(`Salary: ₹${reportData.totalSalary}`, 10, 50);

    // Save the PDF
    doc.save(`Salary_Report_${selectedEmployee}_${selectedMonth}.pdf`);
  };

  // Function to generate a shareable message
  const generateShareableMessage = () => {
    return `Attendance Report for ${selectedEmployee} (${selectedMonth}):
    - Present Days: ${reportData.presentCount}
    - Absent Days: ${reportData.absentCount}
    - OT Hours: ${reportData.otHours}
    - Salary: RS.${reportData.totalSalary.toFixed(2)}`;
  };

  // Function to share via WhatsApp
  const shareOnWhatsApp = () => {
    const message = generateShareableMessage();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    const message = generateShareableMessage();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    const message = generateShareableMessage();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Function to share on LinkedIn
  const shareOnLinkedIn = () => {
    const message = generateShareableMessage();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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
          <h2>Attendance Report for {selectedEmployee}</h2>
          <p><strong>Present Days:</strong> {reportData.presentCount}</p>
          <p><strong>Absent Days:</strong> {reportData.absentCount}</p>
          <p><strong>OT Hours:</strong> {reportData.otHours}</p>
          <p><strong>Salary:</strong> RS.{reportData.totalSalary.toFixed(2)}</p>

          {/* Generate PDF Button */}
          <button onClick={generatePdf} className="pdf-button">
            Download PDF
          </button>

          {/* Social Media Share Buttons */}
          <div className="social-media-buttons">
            <button onClick={shareOnWhatsApp} className="whatsapp-button">
              Share on WhatsApp
            </button>
            <button onClick={shareOnFacebook} className="facebook-button">
              Share on Facebook
            </button>
            <button onClick={shareOnTwitter} className="twitter-button">
              Share on Twitter
            </button>
            <button onClick={shareOnLinkedIn} className="linkedin-button">
              Share on LinkedIn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalaryReport;
