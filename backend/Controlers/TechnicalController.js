const Technical = require("../Model/TechnicalModel");

// Add a new technical record (Log new maintenance records promptly)
exports.addTechnicalRecord = async (req, res) => {
  try {
    const {
      machineId,
      maintenanceType, // e.g., Preventive, Corrective
      description,
      maintenanceDate,
      technician,
      partsUsed, // e.g., Spare parts, Engine oil
    } = req.body;

    const newRecord = new Technical({
      machineId,
      maintenanceType,
      description,
      maintenanceDate,
      technician,
      partsUsed,
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error("Error adding technical record:", error);
    res.status(500).json({
      message: "Error adding technical record",
      error: error.message,
    });
  }
};

// Retrieve all technical records (Access detailed existing maintenance records)
exports.getAllTechnicalRecords = async (req, res) => {
  try {
    const records = await Technical.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error retrieving technical records:", error);
    res.status(500).json({
      message: "Error retrieving technical records",
      error: error.message,
    });
  }
};

// Retrieve a single technical record by ID
exports.getTechnicalRecordById = async (req, res) => {
  try {
    const record = await Technical.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Technical record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    console.error("Error retrieving technical record:", error);
    res.status(500).json({
      message: "Error retrieving technical record",
      error: error.message,
    });
  }
};

// Modify a technical record by ID (Update records as needed)
exports.updateTechnicalRecord = async (req, res) => {
  try {
    const updatedRecord = await Technical.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Technical record not found" });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error("Error updating technical record:", error);
    res.status(500).json({
      message: "Error updating technical record",
      error: error.message,
    });
  }
};

// Remove a technical record by ID (Delete outdated maintenance records)
exports.deleteTechnicalRecord = async (req, res) => {
  try {
    const deletedRecord = await Technical.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Technical record not found" });
    }

    res.status(200).json({ message: "Technical record deleted successfully" });
  } catch (error) {
    console.error("Error deleting technical record:", error);
    res.status(500).json({
      message: "Error deleting technical record",
      error: error.message,
    });
  }
};
