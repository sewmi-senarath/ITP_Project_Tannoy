const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    //default: uuidv4, // Generate UUID by default
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract'], // Ensure the value sent matches one of these
    required: true,
  },

  photo: {
    type: String, // Optional field for storing photo filename or URL
    default: null,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
