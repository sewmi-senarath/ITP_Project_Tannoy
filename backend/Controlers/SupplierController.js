// controllers/SupplierController.js
const Supplier = require("../Model/SupplierModel");


// Get all Supplier
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers= await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving items', error: err.message });
  }
};

// Get an Supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving supplier', error: err.message });
  }
};

// Add a new Supplier
exports.addSupplier= async (req, res) => {
  const {supCode, SupplierName, ContactInfo, DeliveryItem, ItemPrice,Discount } = req.body;
  try {
    const newSupplier = new Supplier({supCode, SupplierName, ContactInfo, DeliveryItem, ItemPrice,Discount });
    await newSupplier.save();
    res.status(201).json(newSupplier);
    console.log("Created Successfully");
  } catch (err) {
    res.status(500).json({ message: 'Error adding supplier', error: err.message });
  }
};

// Update an Supplier 
exports.updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(500).json({ message: 'Error updating Supplier', error: err.message });
  }
};

// Delete an Supplier 
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting supplier', error: err.message });
  }
};

