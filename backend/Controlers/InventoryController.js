const Item = require("../Model/InventoryModel");

// Get all items in database
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving items', error: err.message });
  }
};

// Get an item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving item', error: err.message });
  }
};

// Add a new item
exports.addItem = async (req, res) => {
  const { itemName, itemDescription, itemCategory, stockSize, itemCode, availability } = req.body;
  
  try {
    // Check if there is an item with the same itemName but a different itemCode
    const existingItem = await Item.findOne({ itemName, itemCode: { $ne: itemCode } });
    if (existingItem) {
      return res.status(400).json({ message: 'An item with the same name but a different code already exists in the stock.' });
    }

    // If no conflicting items, create the new item
    const newItem = new Item({ itemName, itemDescription, itemCategory, stockSize, itemCode, availability });
    await newItem.save();
    res.status(201).json(newItem);
    console.log("Created Successfully");
  } catch (err) {
    res.status(500).json({ message: 'Error adding item', error: err.message });
  }
};


// Update an item by ID
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item', error: err.message });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err.message });
  }
};
