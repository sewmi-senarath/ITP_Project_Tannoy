const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Technical model
const technicalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, { collection: 'technical' });

// Create and export the model
const Technical = mongoose.model('Technical', technicalSchema);
module.exports = Technical;
