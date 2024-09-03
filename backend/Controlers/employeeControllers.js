// controllers/employeeController.js

const Employee = require("../Model/EmployeeModel");

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const {
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

    console.log(req.body);  // Log the incoming request body

    const employee = new Employee({
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

    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({
      message: "Error creating employee",
      error: error.message,
      validationErrors: error.errors  // Include specific validation errors
    });
  }
};


// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res
      .status(500)
      .json({ message: "Error retrieving employees", error: error.message });
  }
};

// Get a single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error retrieving employee by ID:", error);
    res
      .status(500)
      .json({ message: "Error retrieving employee", error: error.message });
  }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
};

// Export the functions
// exports.getAllEmployees = getAllEmployees;
// exports.createEmployee = createEmployee;
// exports.getEmployeeById = getEmployeeById;
// exports.updateEmployee = updateEmployee;
// exports.deleteEmployee = deleteEmployee;
