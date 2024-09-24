const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crmSchema = new Schema({
   fname: {
      type: String,
      required: true,
    },
    sname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  });
    
module.exports = mongoose.model(
    "CRMReg" , //file name'
    crmSchema //function name
)