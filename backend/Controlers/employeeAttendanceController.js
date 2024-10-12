const EmployeeAttendance = require("../Model/EmployeeAttendance");
const Employee = require("../Model/EmployeeModel");


// Controller to mark attendance (Create)
exports.markAttendance = async (req, res) => {
  console.log("Request Body:", req.body); // Log the incoming request body for debugging
  const { empId, date, status, otHours, allowances, incentives } = req.body;

  // Validate required fields
  if (!empId || !date || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create a new attendance record
    const attendanceRecord = new EmployeeAttendance({
      empId,
      date,
      status,
      otHours: otHours || 0,
      allowances: allowances || [], // Ensure allowances are set to an empty array if not provided
      incentives: incentives || [], // Ensure incentives are set to an empty array if not provided
    });

    // Save the attendance record to the database
    await attendanceRecord.save();
    res
      .status(201)
      .json({ message: "Attendance marked successfully!", attendanceRecord });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Error marking attendance.", error });
  }
};

// Controller to get all attendance records (Read all)
exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await EmployeeAttendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res
      .status(500)
      .json({ message: "Error fetching attendance records.", error });
  }
};

// Controller to get attendance for a specific employee (Read by employee ID)
exports.getAttendanceByEmployeeId = async (req, res) => {
  const { empId } = req.params;

  try {
    const attendanceRecords = await EmployeeAttendance.find({ empId });
    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendance records found for this employee." });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res
      .status(500)
      .json({ message: "Error fetching attendance records.", error });
  }
};

// Controller to get attendance by a specific date (Read by date)
exports.getAttendanceByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const attendanceRecords = await EmployeeAttendance.find({ date });
    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendance records found for this date." });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res
      .status(500)
      .json({ message: "Error fetching attendance records.", error });
  }
};


exports.generateEmployeeReport = async (req, res) => {
  const { empId } = req.params;
  const { month } = req.query;

  if (!month || !empId) {
    return res
      .status(400)
      .json({ message: "Employee ID and month are required." });
  }

  try {
    const year = new Date().getFullYear();
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    
    const attendanceRecords = await EmployeeAttendance.find({
      empId,
      date: { $gte: startDate, $lte: endDate },
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({
        message:
          "No attendance records found for this employee in the selected month.",
      });
    }

  
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const { employmentType, position } = employee;

   
    const allowanceValues = {
      meal: 400,
      medical: 1000,
      transport: 500
    };

    const incentiveValues = {
      performance: 5000, 
      attendance: 3000,
    };

    let dailySalary;
    let otRate;

    if (employmentType === "Full-Time") {
      switch (position) {
        case "Delivery":
          dailySalary = 2000;
          otRate = 600;
          break;
        case "Technical":
          dailySalary = 2500;
          otRate = 400;
          break;
        case "Finance":
          dailySalary = 3000;
          otRate = 200;
          break;
        default:
          dailySalary = 2000;
          otRate = 500;
          break;
      }
    } else if (employmentType === "Part-Time") {
      switch (position) {
        case "Delivery":
          dailySalary = 1000;
          otRate = 400;
          break;
        case "Technical":
          dailySalary = 1200;
          otRate = 300;
          break;
        default:
          dailySalary = 1000;
          otRate = 300;
          break;
      }
    } else if (employmentType === "Contract") {
      switch (position) {
        case "Delivery":
          dailySalary = 1000;
          otRate = 300;
          break;
        case "Technical":
          dailySalary = 1200;
          otRate = 250;
          break;
        default:
          dailySalary = 1200;
          otRate = 250;
          break;
      }
    }


    const presentCount = attendanceRecords.filter(
      (record) => record.status === "Present"
    ).length;
    const absentCount = attendanceRecords.filter(
      (record) => record.status === "Absent"
    ).length;
    const otHours = attendanceRecords.reduce(
      (total, record) => total + record.otHours,
      0
    );

    const mealAllowances = presentCount * allowanceValues.meal;
    const medicalAllowances = presentCount * allowanceValues.medical;
    const transportAllowances = presentCount * allowanceValues.transport;;

    let performanceIncentive = 0;
    let attendanceIncentive = 0;

    attendanceRecords.forEach((record) => {
      if (record.incentives.includes("Performance")) {
        performanceIncentive += incentiveValues.performance;
      }
      if (record.incentives.includes("Attendance")) {
        attendanceIncentive += incentiveValues.attendance;
      }
      
    });

    const totalSalary =
      presentCount * dailySalary +
      otHours * otRate +
      mealAllowances +
      medicalAllowances +
      transportAllowances +
      performanceIncentive +
      attendanceIncentive;

    const epfAmount = totalSalary * 0.03;
    const etfAmount = totalSalary * 0.03;

    const finalSalary = totalSalary - epfAmount - etfAmount;

    res.status(200).json({
      presentCount,
      absentCount,
      otHours,
      mealAllowances,
      medicalAllowances,
      transportAllowances,
      performanceIncentive,
      attendanceIncentive,
      totalSalary,
      epfAmount,
      etfAmount,
      finalSalary,
    });
  } catch (error) {
    console.error("Error generating employee salary report:", error);
    res
      .status(500)
      .json({ message: "Error generating employee salary report.", error });
  }
};

