const EmployeeAttendance = require('../Model/EmployeeAttendance'); 
const Employee = require('../Model/EmployeeModel');

  //sewmi edited
  // Fixed values for allowances
  // const allowanceValues = {
  //   Meal: 300,     // Example allowance values
  //   Medical: 200,
  //   Transport: 150
  // };

  // // Fixed values for incentives
  // const incentiveValues = {
  //   Performance: 500, // Example incentive values
  //   Attendance: 300,
  //   Referral: 400
  // };
  //sewmi edited

// Controller to mark attendance (Create)
exports.markAttendance = async (req, res) => {
    const { empId, date, status, otHours} = req.body;
  
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
        // allowances: allowances || [], // Store selected allowances
        // incentives: incentives || []    // Store selected incentives
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

    //sewmi edited
    
     // Calculate total allowances and incentives
    //  let totalAllowances = 0;
    //  let totalIncentives = 0;

    //  attendanceRecords.forEach(record => {
    //   record.allowances.forEach(allowance => {
    //     totalAllowances += allowanceValues[allowance] || 0; // Add fixed value if exists
    //   });
    //   record.incentives.forEach(incentive => {
    //     totalIncentives += incentiveValues[incentive] || 0; // Add fixed value if exists
    //   });
    // });

    // // Calculate the total salary
    // const totalSalary = (presentCount * dailySalary) + (otHours * otRate) + totalAllowances + totalIncentives;

    // Calculate EPF and ETF (3% deduction)
    const epfAmount = totalSalary * 0.03;
    const etfAmount = totalSalary * 0.03;

    // Calculate final salary after EPF and ETF deductions
    const finalSalary = totalSalary - epfAmount - etfAmount;

    //sewmi edited
    // Respond with the calculated data
    res.status(200).json({
      presentCount,
      absentCount,
      otHours,
      totalSalary,
      // totalAllowances,
      // totalIncentives,
      epfAmount,
      etfAmount,
      finalSalary
    });
  } catch (error) {
    console.error('Error generating employee report:', error);
    res.status(500).json({ message: 'Error generating employee report.', error });
  }
};




// const EmployeeAttendance = require('../Model/EmployeeAttendance');
// const Employee = require('../Model/EmployeeModel');
// const SalaryDetails = require('../Model/SalaryDetailsModel')

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
//   const { empId } = req.params;
//   const { month, selectedAllowances, selectedIncentives, bonus } = req.body; // Receive selected checkboxes and bonus from frontend
 

//   if (!month || !empId) {
//     return res.status(400).json({ message: 'Employee ID and month are required.' });
//   }

//   try {
//     const year = new Date().getFullYear();
//     const startDate = new Date(`${year}-${month}-01`);
//     const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

//     // Fetch attendance records for the given month
//     const attendanceRecords = await EmployeeAttendance.find({
//       empId,
//       date: { $gte: startDate, $lte: endDate },
//     });

//     if (attendanceRecords.length === 0) {
//       return res.status(404).json({ message: 'No attendance records found for this employee in the selected month.' });
//     }

//     // Fetch the employee details (including employment type and position)
//     const employee = await Employee.findOne({ empId });
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found.' });
//     }

//     const { employmentType, position } = employee;

//     // Set salary and OT rates based on employment type and position
//     let dailySalary;
//     let otRate;

//     //logic for salary based on employment type and position
//     if (employmentType === 'Full-Time') {
//       switch (position) {
//           case 'Delivery':
//               dailySalary = 2000;
//               otRate = 600;
//               break;
//           case 'Technical':
//               dailySalary = 2500;
//               otRate = 400;
//               break;
//           case 'Finance':
//               dailySalary = 3000;
//               otRate = 200;
//               break;
//           case 'Inquiry':
//               dailySalary = 2000;
//               otRate = 200;
//               break;
//           case 'Developer':
//               dailySalary = 2500;
//               otRate = 500;
//               break;
//           case 'Operator':
//               dailySalary = 2300;
//               otRate = 600;
//               break;
//           case 'Tester':
//               dailySalary = 2200;
//               otRate = 600;
//               break;
//           case 'Cleaning':
//               dailySalary = 1200;
//               otRate = 300;
//               break;
//           case 'HR':
//               dailySalary = 2400;
//               otRate = 350;
//               break;
//           case 'Sales':
//               dailySalary = 3000;
//               otRate = 450;
//               break;
//           case 'Trainee':
//               dailySalary = 800;
//               otRate = 150;
//               break;
//           case 'Supervisor':
//               dailySalary = 2700;
//               otRate = 500;
//               break;
//           case 'Helper':
//               dailySalary = 1300;
//               otRate = 100;
//               break;
//           default:
//               dailySalary = 2000; // Default salary for unspecified positions
//               otRate = 500;       // Default OT rate for unspecified positions
//       }
//     } else if (employmentType === 'Part-Time') {
//       switch (position) {
//           case 'Delivery':
//               dailySalary = 1000;
//               otRate = 400;
//               break;
//           case 'Technical':
//               dailySalary = 1200;
//               otRate = 300;
//               break;
//           case 'Finance':
//               dailySalary = 1500;
//               otRate = 150;
//               break;
//           case 'Inquiry':
//               dailySalary = 1000;
//               otRate = 150;
//               break;
//           case 'Developer':
//               dailySalary = 1200;
//               otRate = 300;
//               break;
//           case 'Operator':
//               dailySalary = 1100;
//               otRate = 400;
//               break;
//           case 'Tester':
//               dailySalary = 1100;
//               otRate = 400;
//               break;
//           case 'Cleaning':
//               dailySalary = 600;
//               otRate = 200;
//               break;
//           case 'HR':
//               dailySalary = 1200;
//               otRate = 250;
//               break;
//           case 'Sales':
//               dailySalary = 1500;
//               otRate = 300;
//               break;
//           case 'Trainee':
//               dailySalary = 500;
//               otRate = 100;
//               break;
//           case 'Supervisor':
//               dailySalary = 1400;
//               otRate = 300;
//               break;
//           case 'Helper':
//               dailySalary = 700;
//               otRate = 50;
//               break;
//           default:
//               dailySalary = 1000; // Default salary for unspecified positions
//               otRate = 300;       // Default OT rate for unspecified positions
//       }
//     } else if (employmentType === 'Contract') {
//       switch (position) {
//           case 'Delivery':
//               dailySalary = 1000;
//               otRate = 300;
//               break;
//           case 'Technical':
//               dailySalary = 1200;
//               otRate = 250;
//               break;
//           case 'Finance':
//               dailySalary = 1500;
//               otRate = 100;
//               break;
//           case 'Inquiry':
//               dailySalary = 1000;
//               otRate = 100;
//               break;
//           case 'Developer':
//               dailySalary = 1200;
//               otRate = 250;
//               break;
//           case 'Operator':
//               dailySalary = 1100;
//               otRate = 300;
//               break;
//           case 'Tester':
//               dailySalary = 1100;
//               otRate = 300;
//               break;
//           case 'Cleaning':
//               dailySalary = 600;
//               otRate = 200;
//               break;
//           case 'HR':
//               dailySalary = 1200;
//               otRate = 200;
//               break;
//           case 'Sales':
//               dailySalary = 1500;
//               otRate = 250;
//               break;
//           case 'Trainee':
//               dailySalary = 500;
//               otRate = 100;
//               break;
//           case 'Supervisor':
//               dailySalary = 1400;
//               otRate = 250;
//               break;
//           case 'Helper':
//               dailySalary = 700;
//               otRate = 50;
//               break;
//           default:
//               dailySalary = 1200; // Default salary for unspecified positions
//               otRate = 250;       // Default OT rate for unspecified positions
//       }
//     }

  
//     // Now handle the allowances and incentives based on selected checkboxes
//     let totalAllowance = 0;
//     let totalIncentive = 0;

//     // Predefined company values for allowances and incentives
//     const fixedAllowances = {
//       meal: 1000,
//       medical: 2000,
//       transport: 1500
//     };

//     const fixedIncentives = {
//       performance: 5000,
//       attendance: 3000,
//       overtime: 2000
//     };

//     // Calculate total allowances based on the selections
//     if (selectedAllowances) {
//       selectedAllowances.forEach(allowance => {
//         totalAllowance += fixedAllowances[allowance] || 0;
//       });
//     }

//     // Calculate total incentives based on the selections
//     if (selectedIncentives) {
//       selectedIncentives.forEach(incentive => {
//         totalIncentive += fixedIncentives[incentive] || 0;
//       });
//     }

//     // Calculate bonus if provided, otherwise default to 0
//     const calculatedBonus = parseFloat(bonus) || 0;

//     // Calculate present days, absent days, OT hours, and total salary
//     const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
//     const absentCount = attendanceRecords.filter(record => record.status === 'Absent').length;
//     const otHours = attendanceRecords.reduce((total, record) => total + record.otHours, 0);
//     const totalSalary = (presentCount * dailySalary) + (otHours * otRate) + totalAllowance + totalIncentive + calculatedBonus;

//      // Save salary details to the database
//      const salaryDetails = new SalaryDetails({
//       empId,
//       allowances: selectedAllowances,
//       incentives: selectedIncentives,
//       bonus: calculatedBonus,
//       totalSalary,
//     });

//     await salaryDetails.save();

//     // Respond with the calculated data
//     res.status(200).json({
//       message: 'Employee salary report generated successfully',
//       totalSalary,
//       presentCount,
//       absentCount,
//       allowances: selectedAllowances,
//       incentives: selectedIncentives,
//       bonus: calculatedBonus,
//     });
//   } catch (error) {
//     console.error('Error generating employee salary report:', error);
//     res.status(500).json({ message: 'Error generating employee salary report.', error });
//   };

//   module.exports = {
//     generateEmployeeReport,
//   };


// }
