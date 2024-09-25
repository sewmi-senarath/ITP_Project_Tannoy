const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  itemDescription: {
    type: String,
    trim: true
  },
  itemCategory: {
    type: String,
    required: true,
    trim: true
  },
  stockSize: {
    type: Number,
    required: true,
    min: 0
  },
  itemCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  availability: {
    type: String,
    enum: ['Available', 'Unavailable'],  // Enum for dropdown options
    default: 'Available',
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
