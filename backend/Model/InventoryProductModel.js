const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
    trim: true
  },
  ProducDescription: {
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
    unique: true,
    trim: true
  },
  availability: {
    type: String,
    
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
