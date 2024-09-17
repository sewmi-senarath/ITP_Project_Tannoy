const express = require('express');
const router = express.Router();
const technicalController = require('../Controllers/TechnicalController');

// Route to get all technical records
router.get('/', technicalController.getAllTechnicalRecords);

// Route to add a new technical record
router.post('/', technicalController.addTechnicalRecord);

// Route to get a single technical record by ID
router.get('/:id', technicalController.getTechnicalRecordById);

// Route to update a technical record by ID
router.put('/:id', technicalController.updateTechnicalRecord);

// Route to delete a technical record by ID
router.delete('/:id', technicalController.deleteTechnicalRecord);

module.exports = router;
