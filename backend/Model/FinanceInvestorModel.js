const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financeInvestorSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gmail: { type: String, required: true },
  maidenname: { type: String },
  nic: { type: String, required: true },
  accountnum: { type: String, required: true },
  bankname: { type: String, required: true },
  accname: { type: String, required: true },
  invtdate: { type: Date, required: true },
  amt: { type: Number, required: true },
  percentage: { type: Number, required: true },
}, { collection: "Investor" });

const Investor = mongoose.model("Investor", financeInvestorSchema);

module.exports = Investor;
