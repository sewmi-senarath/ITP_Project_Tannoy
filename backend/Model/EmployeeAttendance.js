const mongoose = require("mongoose");

const employeeAttendanceSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
    otHours: {
      type: Number,
      default: 0,
    },
    allowances: {
      type: [String], // Allowance field expects an array of strings
      enum: ["Meal", "Medical", "Transport"],
      default: [],
    },
    incentives: {
      type: [String], // Incentive field expects an array of strings
      enum: ["Performance", "Attendance"],
      default: [],
    },
  },
  { collection: "employeeAttendance" }
);

module.exports = mongoose.model("EmployeeAttendance", employeeAttendanceSchema);
