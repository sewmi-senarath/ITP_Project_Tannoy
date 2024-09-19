const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  SupplierName: {
    type: String,
    required: true,
    trim: true
  },
  ContatInfo: {
    type: Number,
    trim: true
  },
  DeliveryItem: {
    type: String,
    required: true,
    trim: true
  },
  ItemPrice: {
    type: String,
    required: true,
    min: 0
  },
  Discount: {
    type: String,
    required: true,
    
    
  },
 
});

const Supplier= mongoose.model('Supplier', SupplierSchema);

module.exports = Supplier;
