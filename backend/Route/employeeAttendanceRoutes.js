const express = require('express');
const router = express.Router();
const employeeAttendanceController = require('../Controlers/employeeAttendanceController');

// Route to mark attendance (Create)
router.post('/', employeeAttendanceController.markAttendance);

// Route to get all attendance records
router.get('/', employeeAttendanceController.getAllAttendance);

// Route to get attendance records for a specific employee by empId
router.get('/employee/:empId', employeeAttendanceController.getAttendanceByEmployeeId);

// Route to get attendance records by date
router.get('/date/:date', employeeAttendanceController.getAttendanceByDate);

// New route to generate employee report by month
router.get('/report/:empId', employeeAttendanceController.generateEmployeeReport);

module.exports = router;
