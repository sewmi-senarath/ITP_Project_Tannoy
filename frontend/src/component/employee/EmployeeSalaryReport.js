import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Logo from '../../images/logo.jpeg';
import "../employee/employeeGenerateReport.css";

const EmployeeSalaryReport = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [reportData, setReportData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle form submission
  const handleGenerateReport = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !selectedMonth) {
      setErrorMessage("Please select both an employee and a month.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/attendance/report/${selectedEmployee}?month=${selectedMonth}`
      );

      setReportData(response.data);
    } catch (error) {
      console.error("Error generating report:", error);
      setErrorMessage("Error generating report.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate PDF
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

    doc.setFontSize(16);
    doc.text(`Attendance Report for ${selectedEmployee}`, 30, 75);
    doc.text(`Present Days: ${reportData.presentCount}`, 30, 85);
    doc.text(`Absent Days: ${reportData.absentCount}`, 30, 95);
    doc.text(`OT Hours: ${reportData.otHours}`, 30, 105);
    doc.text(`Meal Allowances: Rs.${reportData.mealAllowances}`, 30, 115);
    doc.text(`Medical Allowances: Rs.${reportData.medicalAllowances}`, 30, 125);
    doc.text(`Transport Allowances: Rs.${reportData.transportAllowances}`, 30, 135);
    doc.text(
      `Performance Incentive: Rs.${reportData.performanceIncentive}`,
      30,
      145
    );
    doc.text(
      `Attendance Incentive: Rs.${reportData.attendanceIncentive}`,
      30,
      155
    );

    doc.text(`Total Salary: Rs.${reportData.totalSalary}`, 30, 175);
    
    // Add horizontal line
    doc.setLineWidth(0.2);
    doc.line(5, 178, 150, 178); // X1, Y1, X2, Y2 for the line

    doc.setFontSize(17);
    doc.text(
      `Final Salary after deductions: Rs.${reportData.finalSalary}`,
      30,
      188
    );

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

  return (
    <div className="report-container">
      <h1 className="report-title">Salary Report</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleGenerateReport}>
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

        <div className="form-group">
          <label htmlFor="month">Select Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">--Select Month--</option>
            {[
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
            ].map((month, index) => (
              <option key={month} value={month}>
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="generate-button">
          {isLoading ? "Generating Report..." : "Generate Report"}
        </button>
      </form>

      {reportData && (
        <div className="report-output">
          <h2>Preview of Salary Report for {selectedEmployee}</h2>
          <p>
            <strong>Present Days:</strong> {reportData.presentCount}
          </p>
          <p>
            <strong>Absent Days:</strong> {reportData.absentCount}
          </p>
          <p>
            <strong>OT Hours:</strong> {reportData.otHours}
          </p>
          <p>
            <strong>Meal Allowances:</strong> Rs.{reportData.mealAllowances}
          </p>
          <p>
            <strong>Medical Allowances:</strong> Rs.{reportData.medicalAllowances}
          </p>
          <p>
            <strong>Transport Allowances:</strong> Rs.{reportData.transportAllowances}
          </p>
          <p>
            <strong>Performance Incentive:</strong> Rs.
            {reportData.performanceIncentive}
          </p>
          <p>
            <strong>Attendance Incentive:</strong> Rs.
            {reportData.attendanceIncentive}
          </p>
          <p>
            <strong>Total Salary:</strong> Rs.{reportData.totalSalary}
          </p>
          <p>
            <strong>Final Salary (after deductions):</strong> Rs.
            {reportData.finalSalary}
          </p>

          <button onClick={generatePdf} className="pdf-button">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalaryReport;
