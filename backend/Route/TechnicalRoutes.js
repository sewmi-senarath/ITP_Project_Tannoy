const express = require("express");
const router = express.Router();

// Insert Model (Optional, can be handled entirely in the controller)
const Technical = require("../Model/TechnicalModel");

// Insert Technical Controller
const TechnicalController = require("../Controllers/TechnicalController");

// Routes for Technical Records
// Get all technical records
router.get("/", TechnicalController.getAllTechnicalRecords);

// Add a new technical record
router.post("/", TechnicalController.addTechnicalRecord);

// Get a technical record by ID (matches the ID parameter)
router.get("/:id", TechnicalController.getTechnicalRecordById);

// Update a technical record by ID
router.put("/:id", TechnicalController.updateTechnicalRecord);

// Delete a technical record by ID
router.delete("/:id", TechnicalController.deleteTechnicalRecord);

// Export the router
module.exports = router;
