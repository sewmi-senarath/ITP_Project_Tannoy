// Insert the model
const DeliverMan = require("../Model/delivermanModel");

// Display all users
const getAllUsers = async (req, res, next) => {
  let deliverMans;

  try {
    deliverMans = await DeliverMan.find();
  } catch (err) {
    console.log(err);
  }

  // If no users found
  if (!deliverMans) {
    return res.status(404).json({ message: "Deliver Man not found" });
  }

  // Display all users
  return res.status(200).json({ deliverMans });
};

// Data insert
const addUsers = async (req, res, next) => {
  const { deverManName, vehicleType, LicensPlateNo, contactNo, areaOfRoute, route, status, packageQty } = req.body;

  let newDeliverMan;

  try {
    newDeliverMan = new DeliverMan({
      deverManName,
      vehicleType,
      LicensPlateNo,
      contactNo,
      areaOfRoute,
      route,
      status,
      packageQty,
    });
    await newDeliverMan.save();
  } catch (err) {
    console.log(err);
  }

  // If unable to add user
  if (!newDeliverMan) {
    return res.status(404).json({ message: "Unable to add deliver Man" });
  } else {
    return res.status(200).json({ deliverMan: newDeliverMan });
  }
};

// Get user by ID
const getById = async (req, res, next) => {
  const id = req.params.id;

  let deliverMan;

  try {
    deliverMan = await DeliverMan.findById(id);
  } catch (err) {
    console.log(err);
  }

  // If user not found
  if (!deliverMan) {
    return res.status(404).json({ message: "Deliver Man not found" });
  } else {
    return res.status(200).json({ deliverMan });
  }
};

// Update user details
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { deverManName, vehicleType, LicensPlateNo, contactNo, areaOfRoute, route, status, packageQty } = req.body;

  let updatedDeliverMan;

  try {
    updatedDeliverMan = await DeliverMan.findByIdAndUpdate(id, {
      deverManName,
      vehicleType,
      LicensPlateNo,
      contactNo,
      areaOfRoute,
      route,
      status,
      packageQty,
    });
    updatedDeliverMan = await updatedDeliverMan.save();
  } catch (err) {
    console.log(err);
  }

  // If unable to update user
  if (!updatedDeliverMan) {
    return res.status(404).json({ message: "Unable to update deliver Man details" });
  } else {
    return res.status(200).json({ deliverMan: updatedDeliverMan });
  }
};

// Delete user detail
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let deletedDeliverMan;

  try {
    deletedDeliverMan = await DeliverMan.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  // If unable to delete user
  if (!deletedDeliverMan) {
    return res.status(404).json({ message: "Unable to delete deliverMan details" });
  } else {
    return res.status(200).json({ deliverMan: deletedDeliverMan });
  }
};

// Export the functions
exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
