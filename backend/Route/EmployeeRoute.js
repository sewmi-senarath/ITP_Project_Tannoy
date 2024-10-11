// routes/employeeRoutes.js

const express = require('express');
const router = express.Router();
const employeeController = require("../Controlers/employeeControllers");


// Route to get all employees
router.get('/', employeeController.getAllEmployees);

// Route to add a new employee
// Note: Do not include empId in the request body, it will be generated automatically
router.post('/', employeeController.createEmployee);

// Route to get a single employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Route to update an employee by ID
router.put('/:id', employeeController.updateEmployee);

// Route to delete an employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
