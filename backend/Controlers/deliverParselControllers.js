//insert the model
const Parsel = require("../Model/deliverParselModel");

//display data
const getAllParsel = async (req, res, next) => {
  let parcels;

  try {
    parcels = await Parsel.find(); // Correct model usage
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching parcels" });
  }

  if (!parcels || parcels.length === 0) {
    return res.status(404).json({ message: "Parcels not found" });
  }

  return res.status(200).json({ parcels });
};

//data insert
const addParsel = async (req, res, next) => {
  const {
    orderId,
    fullName,
    phoneNo,
    email,
    address,
    postalCode,
    productType,
    productQty,
    status,
  } = req.body;

  let newParsel;

  try {
    newParsel = new Parsel({
      orderId,
      fullName,
      phoneNo,
      email,
      address,
      postalCode,
      productType,
      productQty,
      status,
    });

    await newParsel.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error adding parsel" });
  }

  return res.status(201).json({ newParsel });
};

//get user by id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let parsel;

  try {
    parsel = await Parsel.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching parsel" });
  }

  if (!parsel) {
    return res.status(404).json({ message: "Parsel not found" });
  }

  return res.status(200).json({ parsel });
};

//Update User details
const updateParsel = async (req, res, next) => {
  const id = req.params.id;
  const {orderId, fullName, phoneNo, email, address, postalCode, productType, productQty, status} = req.body;

  let parsel;

  try {
    parsel = await Parsel.findByIdAndUpdate(id, {orderId: orderId, fullName: fullName, phoneNo: phoneNo, email: email, address: address, postalCode: postalCode, productType: productType, productQty: productQty,status: status});
      // Make sure it returns the updated document
    parsel = await parsel.save();

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating parsel details" });
  }

  if (!parsel) {
    return res.status(404).json({ message: "Parsel not found" });
  } else {
    return res.status(200).json({ parsel });
  }


};

//Delete user Detail
const deleteParsel = async (req, res, next) => {
  const id = req.params.id;
  let deletedParsel;

  try {
    deletedParsel = await Parsel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting parsel" });
  }

  if (!deletedParsel) {
    return res.status(404).json({ message: "Parsel not found" });
  }

  return res.status(200).json({ message: "Parsel deleted successfully" });
};

//export the getAllUsers functions
exports.getAllParsel = getAllParsel;
//export the addUsers functions
exports.addParsel = addParsel;
//export the get users by id functions
exports.getById = getById;
//export update functions
exports.updateParsel = updateParsel;
//export delete functions
exports.deleteParsel = deleteParsel;
