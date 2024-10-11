const Employee = require("../Model/EmployeeModel"); // Assuming your model is in the ../Model/EmployeeModel.js

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const {
      //empId,
      name,
      dob,
      gender,
      address,
      contactNumber,
      email,
      position,
      department,
      employmentType,
      photo,
    } = req.body;

    //edit 2
    // Count the number of existing employees to generate a new ID
    const count = await Employee.countDocuments(); // Count existing employees
    const newEmployeeId = `E${String(count + 1).padStart(5, '0')}`; // Generate the new employee ID (e.g., E00001)


    const employee = new Employee({
      //edit 2
      empId: newEmployeeId, // Assign the generated employee ID
      name,
      dob,
      gender,
      address,
      contactNumber,
      email,
      position,
      department,
      employmentType,
      photo,
    });

    await employee.save();
    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (error) {
    if (error.code === 11000) {  // MongoDB duplicate key error
      // Check which field is duplicate
      if (error.keyValue.empId) {
        return res.status(400).json({ message: `Employee ID ${error.keyValue.empId} already exists.` });
      }
      if (error.keyValue.email) {
        return res.status(400).json({ message: `Email ${error.keyValue.email} already exists.` });
      }
    }
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Failed to add employee", error });
  }
};


// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Retrieve all employees
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({
      message: "Error retrieving employees",
      error: error.message,
    });
  }
};

// Get a single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id); // Find employee by ID
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error retrieving employee by ID:", error);
    res.status(500).json({
      message: "Error retrieving employee",
      error: error.message,
    });
  }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body, // Update with request body data
      { new: true, runValidators: true } // Return the updated document and validate fields
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      message: "Error updating employee",
      error: error.message,
    });
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id); // Find and delete employee by ID

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      message: "Error deleting employee",
      error: error.message,
    });
  }
};
