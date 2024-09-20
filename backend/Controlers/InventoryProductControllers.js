
const Product = require("../Model/InventoryProductModel");


// Get all Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving Product', error: err.message });
  }
};

// Get an Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving Product', error: err.message });
  }
};

// Add a new Product
exports.addProduct = async (req, res) => {
  const { ProductName, ProductDescription, ProductCategory, stockSize, ProductCode, availability } = req.body;
  try {
    const newProduct = new Product({ ProductName, ProductDescription, ProductCategory, stockSize, ProductCode, availability });
    await newProduct.save();
    res.status(201).json(newProduct);
    console.log("Created Successfully");
  } catch (err) {
    res.status(500).json({ message: 'Error adding Product', error: err.message });
  }
};

// Update an Product by ID
exports.updatedProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating Product', error: err.message });
  }
};

// Delete an Product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting Product', error: err.message });
  }
};

