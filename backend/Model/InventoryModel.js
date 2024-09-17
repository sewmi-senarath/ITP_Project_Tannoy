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
    type: Boolean,
    default: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
