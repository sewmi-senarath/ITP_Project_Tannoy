const Technical = require('../Model/TechnicalModel');

// Get all technical records
const getAllTechnicalRecords = async (req, res) => {
  try {
    const technicalRecords = await Technical.find();
    res.status(200).json(technicalRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving technical records', error });
  }
};

// Add a new technical record
const addTechnicalRecord = async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const newRecord = new Technical({
      name,
      description,
      date
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error adding technical record', error });
  }
};

// Get a technical record by ID
const getTechnicalRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const technicalRecord = await Technical.findById(id);
    if (!technicalRecord) {
      return res.status(404).json({ message: 'Technical record not found' });
    }
    res.status(200).json(technicalRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving technical record', error });
  }
};

// Update a technical record by ID
const updateTechnicalRecord = async (req, res) => {
  const { id } = req.params;
  const { name, description, date } = req.body;

  try {
    const updatedRecord = await Technical.findByIdAndUpdate(
      id,
      { name, description, date },
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Technical record not found' });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error updating technical record', error });
  }
};

// Delete a technical record by ID
const deleteTechnicalRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await Technical.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Technical record not found' });
    }
    res.status(200).json({ message: 'Technical record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting technical record', error });
  }
};

// Export the functions
module.exports = {
  getAllTechnicalRecords,
  addTechnicalRecord,
  getTechnicalRecordById,
  updateTechnicalRecord,
  deleteTechnicalRecord
};
