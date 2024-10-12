const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financeSchema = new mongoose.Schema({
  paymentID: { type: String, required: true },
  department: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['debit', 'credit'], required: true },
  contactNumber: { type: String, required: true },
  date: { type: Date, default: Date.now }
},{ collection: 'finance' });

const Finance = mongoose.model('finance', financeSchema);

module.exports = Finance;
