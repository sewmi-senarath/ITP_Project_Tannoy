
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
  const { ProductName, Quality, ProductCategory, stockSize, ProductCode, availability ,price} = req.body;

  try {
    // Create a new product instance
    const newProduct = new Product({
      ProductName,
      Quality,
      ProductCategory,
      stockSize,
      ProductCode,
      availability,
      price
    });

    // Save the product in the database
    await newProduct.save();

    // Return a success response with the created product
    res.status(201).json(newProduct);
    console.log("Product added successfully");
  } catch (error) {
    // Check for unique validation errors
    if (error.code === 11000) {
      res.status(400).json({ message: `Duplicate value for field: ${Object.keys(error.keyValue)[0]}` });
    } else {
      // Return an error response for other cases
      res.status(500).json({ message: 'Error adding product', error });
    }
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

