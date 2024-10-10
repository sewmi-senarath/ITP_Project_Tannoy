// const EmployeeAttendance = require('../Model/EmployeeAttendance');

// // Controller to mark attendance (Create)
// // Controller to mark attendance (Create)
// exports.markAttendance = async (req, res) => {
//     const { empId, date, status, otHours } = req.body;
  
//     try {
//       // Check if attendance record already exists for the given employee and date
//       const existingRecord = await EmployeeAttendance.findOne({ empId, date });
//       if (existingRecord) {
//         return res.status(400).json({ message: 'Attendance already marked for this date.' });
//       }
  
//       // Create a new attendance record
//       const attendanceRecord = new EmployeeAttendance({
//         empId,
//         date,
//         status,
//         otHours: otHours || 0, // Default OT hours to 0 if not provided
//       });
  
//       // Save the attendance record to the database
//       await attendanceRecord.save();
//       res.status(201).json({ message: 'Attendance marked successfully!' });
//     } catch (error) {
//       console.error('Error marking attendance:', error);
//       res.status(500).json({ message: 'Error marking attendance.', error });
//     }
//   };
  

// // Controller to get all attendance records (Read all)
// exports.getAllAttendance = async (req, res) => {
//   try {
//     const attendanceRecords = await EmployeeAttendance.find();
//     res.status(200).json(attendanceRecords);
//   } catch (error) {
//     console.error('Error fetching attendance records:', error);
//     res.status(500).json({ message: 'Error fetching attendance records.', error });
//   }
// };

// // Controller to get attendance for a specific employee (Read by employee ID)
// exports.getAttendanceByEmployeeId = async (req, res) => {
//   const { empId } = req.params;

//   try {
//     const attendanceRecords = await EmployeeAttendance.find({ empId });
//     if (!attendanceRecords || attendanceRecords.length === 0) {
//       return res.status(404).json({ message: 'No attendance records found for this employee.' });
//     }
//     res.status(200).json(attendanceRecords);
//   } catch (error) {
//     console.error('Error fetching attendance records:', error);
//     res.status(500).json({ message: 'Error fetching attendance records.', error });
//   }
// };

// // Controller to get attendance by a specific date (Read by date)
// exports.getAttendanceByDate = async (req, res) => {
//   const { date } = req.params;

//   try {
//     const attendanceRecords = await EmployeeAttendance.find({ date });
//     if (!attendanceRecords || attendanceRecords.length === 0) {
//       return res.status(404).json({ message: 'No attendance records found for this date.' });
//     }
//     res.status(200).json(attendanceRecords);
//   } catch (error) {
//     console.error('Error fetching attendance records:', error);
//     res.status(500).json({ message: 'Error fetching attendance records.', error });
//   }
// };


// // Controller to generate a report for a specific employee by month
// exports.generateEmployeeReport = async (req, res) => {
//     const { empId } = req.params;  // Employee ID from the route parameters
//     const { month } = req.query;   // Selected month (e.g., '01' for January)
  
//     if (!month || !empId) {
//       return res.status(400).json({ message: 'Employee ID and month are required.' });
//     }
  
//     try {
//       const year = new Date().getFullYear();  // Use the current year by default
//       const startDate = new Date(`${year}-${month}-01`);  // Corrected template literal for the first day of the month
//       const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);  // Last day of the month
  
//       // Find all attendance records for the employee within the specified month
//       const attendanceRecords = await EmployeeAttendance.find({
//         empId,
//         date: { $gte: startDate, $lte: endDate },
//       });
  
//       if (attendanceRecords.length === 0) {
//         return res.status(404).json({ message: 'No attendance records found for this employee in the selected month.' });
//       }
  
//       // Calculate present days, absent days, OT hours, and total salary
//       const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
//       const absentCount = attendanceRecords.filter(record => record.status === 'Absent').length;
//       const otHours = attendanceRecords.reduce((total, record) => total + record.otHours, 0);
  
//       const dailySalary = 2000;  // Salary per day
//       const otRate = 500;  // OT rate per hour
//       const totalSalary = (presentCount * dailySalary) + (otHours * otRate);
  
//       res.status(200).json({
//         presentCount,
//         absentCount,
//         otHours,
//         totalSalary,
//       });
//     } catch (error) {
//       console.error('Error generating employee report:', error);
//       res.status(500).json({ message: 'Error generating employee report.', error });
//     }
//   };
  
const EmployeeAttendance = require('../Model/EmployeeAttendance');
const Employee = require('../Model/EmployeeModel');

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
  const { empId } = req.params;
  const { month} = req.query; 

  if (!month || !empId) {
    return res.status(400).json({ message: 'Employee ID and month are required.' });
  }

  try {
    const year = new Date().getFullYear();
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    // Fetch attendance records for the given month
    const attendanceRecords = await EmployeeAttendance.find({
      empId,
      date: { $gte: startDate, $lte: endDate },
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this employee in the selected month.' });
    }

    // Fetch the employee details (including employment type and position)
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const { employmentType, position } = employee;

    // Set salary and OT rates based on employment type and position
    let dailySalary;
    let otRate;

    //logic for salary based on employment type and position
    if (employmentType === 'Full-Time') {
      switch (position) {
          case 'Delivery':
              dailySalary = 2000;
              otRate = 600;
              break;
          case 'Technical':
              dailySalary = 2500;
              otRate = 400;
              break;
          case 'Finance':
              dailySalary = 3000;
              otRate = 200;
              break;
          case 'Inquiry':
              dailySalary = 2000;
              otRate = 200;
              break;
          case 'Developer':
              dailySalary = 2500;
              otRate = 500;
              break;
          case 'Operator':
              dailySalary = 2300;
              otRate = 600;
              break;
          case 'Tester':
              dailySalary = 2200;
              otRate = 600;
              break;
          case 'Cleaning':
              dailySalary = 1200;
              otRate = 300;
              break;
          case 'HR':
              dailySalary = 2400;
              otRate = 350;
              break;
          case 'Sales':
              dailySalary = 3000;
              otRate = 450;
              break;
          case 'Trainee':
              dailySalary = 800;
              otRate = 150;
              break;
          case 'Supervisor':
              dailySalary = 2700;
              otRate = 500;
              break;
          case 'Helper':
              dailySalary = 1300;
              otRate = 100;
              break;
          default:
              dailySalary = 2000; // Default salary for unspecified positions
              otRate = 500;       // Default OT rate for unspecified positions
      }
    } else if (employmentType === 'Part-Time') {
      switch (position) {
          case 'Delivery':
              dailySalary = 1000;
              otRate = 400;
              break;
          case 'Technical':
              dailySalary = 1200;
              otRate = 300;
              break;
          case 'Finance':
              dailySalary = 1500;
              otRate = 150;
              break;
          case 'Inquiry':
              dailySalary = 1000;
              otRate = 150;
              break;
          case 'Developer':
              dailySalary = 1200;
              otRate = 300;
              break;
          case 'Operator':
              dailySalary = 1100;
              otRate = 400;
              break;
          case 'Tester':
              dailySalary = 1100;
              otRate = 400;
              break;
          case 'Cleaning':
              dailySalary = 600;
              otRate = 200;
              break;
          case 'HR':
              dailySalary = 1200;
              otRate = 250;
              break;
          case 'Sales':
              dailySalary = 1500;
              otRate = 300;
              break;
          case 'Trainee':
              dailySalary = 500;
              otRate = 100;
              break;
          case 'Supervisor':
              dailySalary = 1400;
              otRate = 300;
              break;
          case 'Helper':
              dailySalary = 700;
              otRate = 50;
              break;
          default:
              dailySalary = 1000; // Default salary for unspecified positions
              otRate = 300;       // Default OT rate for unspecified positions
      }
    } else if (employmentType === 'Contract') {
      switch (position) {
          case 'Delivery':
              dailySalary = 1000;
              otRate = 300;
              break;
          case 'Technical':
              dailySalary = 1200;
              otRate = 250;
              break;
          case 'Finance':
              dailySalary = 1500;
              otRate = 100;
              break;
          case 'Inquiry':
              dailySalary = 1000;
              otRate = 100;
              break;
          case 'Developer':
              dailySalary = 1200;
              otRate = 250;
              break;
          case 'Operator':
              dailySalary = 1100;
              otRate = 300;
              break;
          case 'Tester':
              dailySalary = 1100;
              otRate = 300;
              break;
          case 'Cleaning':
              dailySalary = 600;
              otRate = 200;
              break;
          case 'HR':
              dailySalary = 1200;
              otRate = 200;
              break;
          case 'Sales':
              dailySalary = 1500;
              otRate = 250;
              break;
          case 'Trainee':
              dailySalary = 500;
              otRate = 100;
              break;
          case 'Supervisor':
              dailySalary = 1400;
              otRate = 250;
              break;
          case 'Helper':
              dailySalary = 700;
              otRate = 50;
              break;
          default:
              dailySalary = 1200; // Default salary for unspecified positions
              otRate = 250;       // Default OT rate for unspecified positions
      }
    }

    // Calculate present days, absent days, OT hours, and total salary
    const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
    const absentCount = attendanceRecords.filter(record => record.status === 'Absent').length;
    const otHours = attendanceRecords.reduce((total, record) => total + record.otHours, 0);
    const totalSalary = (presentCount * dailySalary) + (otHours * otRate);

    
    // Respond with the calculated data
    res.status(200).json({
      presentCount, // Corrected from presentDays to presentCount
      absentCount,    // Ensure to send the calculated absent count
      otHours,
      totalSalary,
    });
  } catch (error) {
    console.error('Error generating employee report:', error);
    res.status(500).json({ message: 'Error generating employee report.', error });
  }
};



