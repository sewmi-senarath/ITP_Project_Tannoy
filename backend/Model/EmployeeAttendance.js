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
  }
}, { collection: 'employeeAttendance' });  // Set collection name to "employeeAttendance"

// Export the model using the new schema
module.exports = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);
