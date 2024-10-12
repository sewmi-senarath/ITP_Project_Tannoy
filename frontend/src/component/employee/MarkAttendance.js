import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MarkAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [otHours, setOtHours] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAllowances, setSelectedAllowances] = useState([]); // NEW for Allowances
  const [selectedIncentives, setSelectedIncentives] = useState([]); // NEW for Incentives
  const navigate = useNavigate();

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !attendanceDate || !status) {
      setErrorMessage("Please fill all required fields.");
      return;
    }


    try {
      const attendanceData = {
        empId: selectedEmployee,
        date: attendanceDate,
        status,
        otHours: status === "Present" ? otHours || 0 : 0, 
        allowances: selectedAllowances,
        incentives: selectedIncentives, 
      };

      await axios.post("http://localhost:5000/api/attendance", attendanceData);
      alert("Attendance submitted successfully!");

      // Clear form fields after submission
      setSelectedEmployee("");
      setAttendanceDate("");
      setStatus("");
      setOtHours("");
      setSelectedAllowances([]);
      setSelectedIncentives([]);
      setErrorMessage("");
      // Navigate to display attendance page
      navigate('/displayattendance');
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setErrorMessage("Error submitting attendance data.");
    }
  };

  // Handle status change - ADDED: Clear OT hours when status is "Absent"
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    // Clear OT hours if status is "Absent"
    if (selectedStatus === "Absent") {
      setOtHours("");
      setSelectedAllowances([]); // Clear selected allowances
      setSelectedIncentives([]); // Clear selected incentives
    }
  };

  // Handle selection of allowances
  const handleAllowancesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAllowances([...selectedAllowances, value]);
    } else {
      setSelectedAllowances(
        selectedAllowances.filter((item) => item !== value)
      );
    }
  };

  // Handle selection of incentives
  const handleIncentivesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIncentives([...selectedIncentives, value]);
    } else {
      setSelectedIncentives(
        selectedIncentives.filter((item) => item !== value)
      );
    }
  };

  // Handle OT Hours input - Added validation to restrict max value to 5
  const handleOtHoursChange = (e) => {
    const enteredValue = e.target.value;
    // Restrict OT hours to be between 0 and 5
    if (enteredValue <= 5) {
      setOtHours(enteredValue);
    } else {
      setOtHours(5); // Set to 5 if value exceeds the maximum allowed
    }
  };

  const handleViewAttendance = () => {
    navigate("/displayattendance");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Mark Attendance
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-center font-semibold mb-4">
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="employee"
            className="block text-sm font-large text-black-700"
          >
            Select Employee:
          </label>
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

        <div className="mb-4">
          <label
            htmlFor="attendance-date"
            className="block text-sm font-large text-black-700"
          >
            Select Date:
          </label>
          <input
            type="date"
            id="attendance-date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

     
        <div className="mb-4">
          <label className="block text-sm font-large text-black-700">
            Status:
          </label>
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

  
        <div className="mb-4">
          <label
            htmlFor="ot-hours"
            className="block text-sm font-large text-gray-700"
          >
            OT Hours (max 5 hours):
          </label>
          <input
            type="number"
            id="ot-hours"
            placeholder="Enter OT hours"
            value={otHours}
            onChange={handleOtHoursChange} // Updated to limit OT hours
            min="0"
            max="5"
            step="0.1" /* Allows decimal values */
            disabled={status === "Absent"}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Allowances Checkboxes */}
        <div className="mb-4">
          <label className="block text-sm font-large text-black-700">
            Allowances:
          </label>
          <div className="flex space-x-4">
            {["Meal", "Medical", "Transport"].map((allowance) => (
              <label
                key={allowance}
                className="flex items-center font-medium text-black-600"
              >
                <input
                  type="checkbox"
                  value={allowance}
                  onChange={handleAllowancesChange}
                  disabled={status === "Absent"} // Disable if employee is Absent
                  className="mr-2"
                />
                {allowance}
              </label>
            ))}
          </div>
        </div>

        {/* Incentives Checkboxes */}
        <div className="mb-4">
          <label className="block text-sm font-large text-black-700">
            Incentives:
          </label>
          <div className="flex space-x-4">
            {["Performance", "Attendance"].map((incentive) => (
              <label
                key={incentive}
                className="flex items-center font-medium text-black-600"
              >
                <input
                  type="checkbox"
                  value={incentive}
                  onChange={handleIncentivesChange}
                  disabled={status === "Absent"} // Disable if employee is Absent
                  className="mr-2"
                />
                {incentive}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>

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
