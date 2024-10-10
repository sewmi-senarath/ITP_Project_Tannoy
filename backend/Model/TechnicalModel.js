const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//expence category model
const machineCategoriesModel = new Schema({
  materialtype: { type: String, default: "Anonymous" },
  color: { type: String, default: "#FCBE44" },
});

// Define the schema for the Technical model
const technicalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  materialtype: { type: String, default: "Anonymous" },
  servicedate: {
    type: Date,
    required: true,
  },
  nextservicedate: {
    type: Date,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  Cost: {
    type: Number,
    required: true,
  },
});

// Create and export the model
const Technical = mongoose.model("Technical", technicalSchema);
const MachineCategories = mongoose.model(
  "machineCategoriesModel",
  machineCategoriesModel,
  "machineCategoriesModel" // This will force the collection to use the exact name
);

exports.default = Technical;
exports.default = MachineCategories;

module.exports = {
  Technical,
  MachineCategories,
};
