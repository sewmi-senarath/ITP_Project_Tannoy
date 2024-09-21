const EmployeeAttendance = require('../Model/EmployeeAttendance');

// Controller to mark attendance (Create)
// Controller to mark attendance (Create)
exports.markAttendance = async (req, res) => {
    const { empId, date, status, otHours } = req.body;
  
    try {
      // Check if attendance record already exists for the given employee and date
      const existingRecord = await EmployeeAttendance.findOne({ empId, date });
      if (existingRecord) {
        return res.status(400).json({ message: 'Attendance already marked for this date.' });
      }
  
      // Create a new attendance record
      const attendanceRecord = new EmployeeAttendance({
        empId,
        date,
        status,
        otHours: otHours || 0, // Default OT hours to 0 if not provided
      });
  
      // Save the attendance record to the database
      await attendanceRecord.save();
      res.status(201).json({ message: 'Attendance marked successfully!' });
    } catch (error) {
      console.error('Error marking attendance:', error);
      res.status(500).json({ message: 'Error marking attendance.', error });
    }
  };
  

// Controller to get all attendance records (Read all)
exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await EmployeeAttendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Error fetching attendance records.', error });
  }
};

// Controller to get attendance for a specific employee (Read by employee ID)
exports.getAttendanceByEmployeeId = async (req, res) => {
  const { empId } = req.params;

  try {
    const attendanceRecords = await EmployeeAttendance.find({ empId });
    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this employee.' });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Error fetching attendance records.', error });
  }
};

// Controller to get attendance by a specific date (Read by date)
exports.getAttendanceByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const attendanceRecords = await EmployeeAttendance.find({ date });
    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this date.' });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Error fetching attendance records.', error });
  }
};


// Controller to generate a report for a specific employee by month
exports.generateEmployeeReport = async (req, res) => {
    const { empId } = req.params;  // Employee ID from the route parameters
    const { month } = req.query;   // Selected month (e.g., '01' for January)
  
    if (!month || !empId) {
      return res.status(400).json({ message: 'Employee ID and month are required.' });
    }
  
    try {
      const year = new Date().getFullYear();  // Use the current year by default
      const startDate = new Date(`${year}-${month}-01`);  // Corrected template literal for the first day of the month
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);  // Last day of the month
  
      // Find all attendance records for the employee within the specified month
      const attendanceRecords = await EmployeeAttendance.find({
        empId,
        date: { $gte: startDate, $lte: endDate },
      });
  
      if (attendanceRecords.length === 0) {
        return res.status(404).json({ message: 'No attendance records found for this employee in the selected month.' });
      }
  
      // Calculate present days, absent days, OT hours, and total salary
      const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
      const absentCount = attendanceRecords.filter(record => record.status === 'Absent').length;
      const otHours = attendanceRecords.reduce((total, record) => total + record.otHours, 0);
  
      const dailySalary = 2000;  // Salary per day
      const otRate = 500;  // OT rate per hour
      const totalSalary = (presentCount * dailySalary) + (otHours * otRate);
  
      res.status(200).json({
        presentCount,
        absentCount,
        otHours,
        totalSalary,
      });
    } catch (error) {
      console.error('Error generating employee report:', error);
      res.status(500).json({ message: 'Error generating employee report.', error });
    }
  };
  
  
