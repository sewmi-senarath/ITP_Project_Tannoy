const mongoose = require("mongoose");
 
// Define the schema for your Employee model
const employeeSchema = new mongoose.Schema({
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
    enum: ["Male", "Female", "Other"],
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
    required: true,
    enum: ["Full-time", "Part-time", "Contract"],
  },
  photo: {
    type: String, // URL or file path to the uploaded photo
    required: true,
  },
},{ collection: 'employee' });
 
// Create the model from the schema
const Employee = mongoose.model("Employee", employeeSchema);
 
module.exports = Employee;