const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
    trim: true
  },
  Quality: {
    type: String, 
    trim: true
  },
  ProductCategory: {
    type: String,
    required: true,
    trim: true
  },
  stockSize: {
    type: Number,
    required: true,
    min: 0
  },
  ProductCode: {
    type: String,
    required: true,
    unique: true, // Ensuring unique ProductCode
    trim: true
  },
  availability: {
    type: String,
    enum: ['In Stock', 'Out of Stock'], // Enforcing valid availability values
    default: 'In Stock' // Default value if not provided
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
