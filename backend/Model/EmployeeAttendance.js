const mongoose = require('mongoose');

// Define the employee attendance schema
const employeeAttendanceSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true
  },
  otHours: {
    type: Number,
    default: 0
  },

  //sewmi edited

  // allowances: {
  //   type: [String],  // Array of strings to hold selected allowance types
  //   enum: ['Meal', 'Medical', 'Transport'], // Example allowance types
  //   default: []
  // },
  // incentives: {
  //   type: [String],  // Array of strings to hold selected incentive types
  //   enum: ['Performance', 'Attendance', 'Referral'], // Example incentive types
  //   default: []
  // }
  
  //sewmi edited

}, { collection: 'employeeAttendance' });  // Set collection name to "employeeAttendance"

// Export the model using the new schema
module.exports = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);
