// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import '../../styles/employeeGenerateReport.css';

// const EmployeeSalaryReport = () => {
//   const [employees, setEmployees] = useState([]); // Hold employee data
//   const [selectedEmployee, setSelectedEmployee] = useState(''); // Selected employee
//   const [selectedMonth, setSelectedMonth] = useState(''); // Selected month
//   const [reportData, setReportData] = useState(null); // Store report data (present/absent/OT/salary)
//   const [errorMessage, setErrorMessage] = useState(''); // Error messages
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   // Fetch employee data from backend when component mounts
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/employees');
//         setEmployees(response.data);
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   // Handle form submission
//   const handleGenerateReport = async (e) => {
//     e.preventDefault();

//     if (!selectedEmployee || !selectedMonth) {
//       setErrorMessage('Please select both an employee and a month.');
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage('');

//     // Fetch report data (attendance, present count, absent count, OT hours, salary)
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/attendance/report/${selectedEmployee}?month=${selectedMonth}`
//       );

//       setReportData(response.data); // Store the report data
//     } catch (error) {
//       console.error('Error generating report:', error);
//       setErrorMessage('Error generating report.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to generate PDF
//   const generatePdf = () => {
//     const doc = new jsPDF();
//     doc.text(`Attendance Report for ${selectedEmployee}`, 10, 10);
//     doc.text(`Present Days: ${reportData.presentCount}`, 10, 20);
//     doc.text(`Absent Days: ${reportData.absentCount}`, 10, 30);
//     doc.text(`OT Hours: ${reportData.otHours}`, 10, 40);
//     doc.text(`Salary: Rs.${reportData.totalSalary}`, 10, 50);

//     // Save the PDF
//     doc.save(`Salary_Report_${selectedEmployee}_${selectedMonth}.pdf`);
//   };

//   // Function to generate a shareable message
//   const generateShareableMessage = () => {
//     return generatePdf();
//   };

//   // Function to share via WhatsApp
//   const shareOnWhatsApp = () => {
//     const message = generateShareableMessage();
//     const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

  

//   // Function to share via Gmail
//   const shareOnGmail = () => {
//     const subject = encodeURIComponent("Attendance Report"); // Email subject
//     const body = encodeURIComponent(generatePdf()); // Email body

//     // Construct the mailto link
//     const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    
//     // Open the default email client (like Gmail) in a new window
//     window.open(mailtoUrl, '_blank');
//   };

//   return (
//     <div className="report-container">
//       <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 'bold' }}>Salary Report</h1>

//       {/* Error Message */}
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {/* Form */}
//       <form onSubmit={handleGenerateReport}>
//         {/* Employee Dropdown */}
//         <div className="form-group">
//           <label htmlFor="employee">Select Employee ID:</label>
//           <select
//             id="employee"
//             value={selectedEmployee}
//             onChange={(e) => setSelectedEmployee(e.target.value)}
//           >
//             <option value="">--Select Employee--</option>
//             {employees.map((employee) => (
//               <option key={employee.empId} value={employee.empId}>
//                 {employee.empId}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Month Dropdown */}
//         <div className="form-group">
//           <label htmlFor="month">Select Month:</label>
//           <select
//             id="month"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//           >
//             <option value="">--Select Month--</option>
//             <option value="01">January</option>
//             <option value="02">February</option>
//             <option value="03">March</option>
//             <option value="04">April</option>
//             <option value="05">May</option>
//             <option value="06">June</option>
//             <option value="07">July</option>
//             <option value="08">August</option>
//             <option value="09">September</option>
//             <option value="10">October</option>
//             <option value="11">November</option>
//             <option value="12">December</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="generate-button">
//           {isLoading ? 'Generating Report...' : 'Generate Report'}
//         </button>
//       </form>

//       {/* Display Report Data */}
//       {reportData && (
//         <div className="report-output">
//           <h2>Attendance Report for {selectedEmployee}</h2>
//           <p><strong>Present Days:</strong> {reportData.presentCount}</p>
//           <p><strong>Absent Days:</strong> {reportData.absentCount}</p>
//           <p><strong>OT Hours:</strong> {reportData.otHours}</p>
//           <p><strong>Salary:</strong> RS.{reportData.totalSalary.toFixed(2)}</p>

//           {/* Generate PDF Button */}
//           <button onClick={generatePdf} className="pdf-button">
//             Download PDF
//           </button>

//           {/* Social Media Share Buttons */}
//           <div className="social-media-buttons">
//             <button onClick={shareOnWhatsApp} className="whatsapp-button">
//               Share on WhatsApp
//             </button>
            
//             <button onClick={shareOnGmail} className="gmail-button">
//               Share via Gmail
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeSalaryReport;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import jsPDF from 'jspdf'; // For generating PDF reports
import '../../styles/MarkAttendance.css'; // Your existing CSS

const MarkAttendance = () => {
  const [employees, setEmployees] = useState([]); // Hold employees data
  const [attendanceRecords, setAttendanceRecords] = useState([]); // Hold fetched attendance records
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

  // Fetch attendance records (for generating report)
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

  // Sort attendance records by date
  const sortByDate = () => {
    const sorted = [...attendanceRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
    setAttendanceRecords(sorted);
  };

  // Generate PDF report sorted by date
  const generatePdfReport = () => {
    sortByDate(); // Ensure the data is sorted before generating the report
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Employee Attendance Report', 10, 10);

    doc.setFontSize(12);
    doc.text('Employee ID', 10, 20);
    doc.text('Date', 50, 20);
    doc.text('Status', 90, 20);
    doc.text('OT Hours', 130, 20);

    attendanceRecords.forEach((record, index) => {
      const rowY = 30 + index * 10;
      doc.text(record.empId, 10, rowY);
      doc.text(new Date(record.date).toLocaleDateString(), 50, rowY);
      doc.text(record.status, 90, rowY);
      doc.text(String(record.otHours), 130, rowY);
    });

    doc.save('Attendance_Report.pdf');
  };

  return (
    <div className="attendance-container">
      <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 'bold' }}>Mark Attendance</h1>

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

      {/* Report Generation Section */}
      <div className="report-section">
        <h2>Generate Attendance Report</h2>
        <button onClick={generatePdfReport} className="generate-report-button">Generate PDF Report</button>
      </div>
    </div>
  );
};

export default MarkAttendance;
