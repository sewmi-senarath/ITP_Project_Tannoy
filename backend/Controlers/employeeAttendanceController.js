const EmployeeAttendance = require('../Model/EmployeeAttendance');

// Controller to mark attendance (Create)
exports.markAttendance = async (req, res) => {
  const { empId, date, status, otHours } = req.body;

  try {
    const attendanceRecord = new EmployeeAttendance({
      empId,
      date,
      status,
      otHours: otHours || 0, // Default OT hours to 0 if not provided
    });

    // Save the attendance record to the database
    await attendanceRecord.save();
    res.status(201).json({ message: 'Attendance marked successfully!' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Error marking attendance.', error });
  }
};

// Controller to get all attendance records (Read all)
exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await EmployeeAttendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Error fetching attendance records.', error });
  }
};

// Controller to get attendance for a specific employee (Read by employee ID)
exports.getAttendanceByEmployeeId = async (req, res) => {
  const { empId } = req.params;

  try {
    const attendanceRecords = await EmployeeAttendance.find({ empId });
    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this employee.' });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Error fetching attendance records.', error });
  }
};

// Controller to get attendance by a specific date (Read by date)
exports.getAttendanceByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const attendanceRecords = await EmployeeAttendance.find({ date });
    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this date.' });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Error fetching attendance records.', error });
  }
};
