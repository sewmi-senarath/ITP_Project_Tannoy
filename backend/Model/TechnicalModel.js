const mongoose = require("mongoose");

// Define the schema for your Technical model
const technicalSchema = new mongoose.Schema({
  machineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine", // Assuming you have a Machine model
    required: true,
  },
  maintenanceType: {
    type: String,
    required: true,
    enum: ["Preventive", "Corrective"], // Example maintenance types
  },
  description: {
    type: String,
    required: true,
  },
  maintenanceDate: {
    type: Date,
    required: true,
  },
  technician: {
    type: String,
    required: true,
  },
  partsUsed: {
    type: [String], // Array of strings to store multiple parts
    required: true,
  },
}, { collection: 'technicals' }); // Name of the collection in MongoDB

// Create the model from the schema
const Technical = mongoose.model("Technical", technicalSchema);

module.exports = Technical;
