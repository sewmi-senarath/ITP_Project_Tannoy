// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
// //import '../employee/MarkAttendance.css';

// const MarkAttendance = () => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [attendanceDate, setAttendanceDate] = useState('');
//   const [otHours, setOtHours] = useState('');
//   const [status, setStatus] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   // Fetch employees when component mounts
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
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedEmployee || !attendanceDate || !status) {
//       setErrorMessage('Please fill all required fields.');
//       return;
//     }

//     // Validate attendance date
//     const today = new Date().toISOString().split('T')[0];
//     if (attendanceDate !== today) {
//       setErrorMessage('Attendance date must be today\'s date.');
//       return;
//     }

//     // Validate OT hours if the status is "Present"
//     if (status === 'Present' && otHours !== '') {
//       if (isNaN(otHours) || Number(otHours) < 0 || Number(otHours) > 5) {
//         setErrorMessage('OT Hours must be a positive number and no more than 5.');
//         return;
//       }
//     }

//     // Submit attendance data
//     try {
//       const attendanceData = {
//         empId: selectedEmployee,
//         date: attendanceDate,
//         status: status,
//         otHours: status === 'Present' ? otHours || 0 : 0, // Set OT hours to 0 if absent
//       };

//       await axios.post('http://localhost:5000/api/attendance', attendanceData);
//       alert('Attendance submitted successfully!');
      
//       // Clear form fields after submission
//       setSelectedEmployee('');
//       setAttendanceDate('');
//       setStatus('');
//       setOtHours('');
//       setErrorMessage('');

//       // Navigate to display attendance page
//       navigate('/displayattendance');
//     } catch (error) {
//       console.error('Error submitting attendance:', error);
//       setErrorMessage('Error submitting attendance data.');
//     }
//   };

//   // Handle status change - ADDED: Clear OT hours when status is "Absent"
//   const handleStatusChange = (e) => {
//     const selectedStatus = e.target.value;
//     setStatus(selectedStatus);

//     // Clear OT hours if status is "Absent" - NEW LOGIC
//     if (selectedStatus === 'Absent') {
//       setOtHours(''); // Clear OT hours
//     }
//   };

//   // Navigate to the Display Attendance page
//   const handleViewAttendance = () => {
//     navigate('/displayattendance');
//   };

//   return (
//     <div className="attendance-container">
//       <h1>Mark Attendance</h1>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <form onSubmit={handleSubmit}>
        
//         {/* Employee Dropdown */}
//         <div className="form-group">
//           <label htmlFor="employee">Select Employee:</label>
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

//         {/* Date Picker */}
//         <div className="form-group">
//           <label htmlFor="attendance-date">Select Date:</label>
//           <input
//             type="date"
//             id="attendance-date"
//             value={attendanceDate}
//             onChange={(e) => setAttendanceDate(e.target.value)}
//             required
//           />
//         </div>

//         {/* Status Radio Buttons */}
//         <div className="form-group">
//           <label>Status:</label>
//           <div className="radio-buttons">
//             <label>
//               <input
//                 type="radio"
//                 id="present"
//                 name="status"
//                 value="Present"
//                 onChange={handleStatusChange} // UPDATED: Use new handleStatusChange method
//                 required
//               />
//               Present
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 id="absent"
//                 name="status"
//                 value="Absent"
//                 onChange={handleStatusChange} // UPDATED: Use new handleStatusChange method
//                 required
//               />
//               Absent
//             </label>
//           </div>
//         </div>

//         {/* OT Hours Input */}
//         <div className="form-group">
//           <label htmlFor="ot-hours">OT Hours (max 5 hours):</label>
//           <input
//             type="number"
//             id="ot-hours"
//             placeholder="Enter OT hours"
//             value={otHours}
//             onChange={(e) => setOtHours(e.target.value)}
//             min="0"
//             max="5" 
//             disabled={status === 'Absent'}
//           />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="submit-button">Submit Attendance</button>
//       </form>

//       {/* Button to View Attendance Records */}
//       <button className="submit-button" onClick={handleViewAttendance}>
//         View Attendance Records
//       </button>
//     </div>
//   );
// };

// export default MarkAttendance;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MarkAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [otHours, setOtHours] = useState('');
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch employees when component mounts
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !attendanceDate || !status) {
      setErrorMessage('Please fill all required fields.');
      return;
    }

    // Validate attendance date
    const today = new Date().toISOString().split('T')[0];
    if (attendanceDate !== today) {
      setErrorMessage('Attendance date must be today\'s date.');
      return;
    }

    // Validate OT hours if the status is "Present"
    if (status === 'Present' && otHours !== '') {
      const otValue = parseFloat(otHours);
      if (isNaN(otValue) || otValue < 1 || otValue > 5) {
        setErrorMessage('OT Hours must be a number between 1 and 5.');
        return;
      }
    }


    // Submit attendance data
    try {
      const attendanceData = {
        empId: selectedEmployee,
        date: attendanceDate,
        status: status,
        otHours: status === 'Present' ? otHours || 0 : 0, // Set OT hours to 0 if absent
      };

      await axios.post('http://localhost:5000/api/attendance', attendanceData);
      alert('Attendance submitted successfully!');
      
      // Clear form fields after submission
      setSelectedEmployee('');
      setAttendanceDate('');
      setStatus('');
      setOtHours('');
      setErrorMessage('');

      // Navigate to display attendance page
      navigate('/displayattendance');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setErrorMessage('Error submitting attendance data.');
    }
  };

  // Handle status change - ADDED: Clear OT hours when status is "Absent"
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    // Clear OT hours if status is "Absent"
    if (selectedStatus === 'Absent') {
      setOtHours('');
    }
  };

  // Navigate to the Display Attendance page
  const handleViewAttendance = () => {
    navigate('/displayattendance');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Mark Attendance</h1>

      {errorMessage && <p className="text-red-500 text-center font-semibold mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Employee Dropdown */}
        <div className="mb-4">
          <label htmlFor="employee" className="block text-sm font-large text-black-700">Select Employee:</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
        <div className="mb-4">
          <label htmlFor="attendance-date" className="block text-sm font-large text-black-700">Select Date:</label>
          <input
            type="date"
            id="attendance-date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

       {/* Status Radio Buttons */}
        <div className="mb-4">
          <label className="block text-sm font-large text-black-700">Status:</label>
          <div className="flex space-x-12 mt-2">
            <label className="flex items-center font-medium text-gray-600">
              <input
                type="radio"
                id="present"
                name="status"
                value="Present"
                onChange={handleStatusChange}
                required
                className="mr-2"
              />
              Present
            </label>
            <label className="flex items-center font-medium text-black-600">
              <input
                type="radio"
                id="absent"
                name="status"
                value="Absent"
                onChange={handleStatusChange}
                required
                className="mr-2"
              />
              Absent
            </label>
          </div>
        </div>



        {/* OT Hours Input */}
        <div className="mb-4">
          <label htmlFor="ot-hours" className="block text-sm font-large text-gray-700">OT Hours (max 5 hours):</label>
          <input
            type="number"
            id="ot-hours"
            placeholder="Enter OT hours"
            value={otHours}
            onChange={(e) => setOtHours(e.target.value)}
            min="1"
            max="5"
            step="0.1"  /* Allows decimal values */
            disabled={status === 'Absent'}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <br />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>

      {/* Button to View Attendance Records */}
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold mt-4 hover:bg-gray-600 transition duration-300"
        onClick={handleViewAttendance}
      >
        View Attendance Records
      </button>
    </div>
  );
};

export default MarkAttendance;
