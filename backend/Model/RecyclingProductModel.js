const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recyclingProductSchema = new Schema({
  //Create data for form
  recyclingProductName:{
    type:String,//Data Type
    required:true,//validate
  },
  quantity:{
    type:Number,//Data Type
    required:true,//validate
  },
  stage:{
    type:String,//Data Type "CLEANING, SORTING, MELTING"
    required:true,//validate
  },
  quality:{
    type:String,//Data Type "GOOD, MEDIUM, LOW"
    required:true,//validate
  },
  status:{
    type:String,//Data Type "DONE, INPROGRESS, REJECT"
    required:true,//validate
  },
  quality:{
    type:String,//Data Type "GOOD, MEDIUM, LOW"
    required:true,//validate
  },
  date: {
    type: Date, // Data Type
    default: Date.now, // Set the default value to the current date and time
    required: true, // validate
  },
machineName:{
  type:String,//Data Type
  required:true,//validate
},
machineCondition:{
  type:String,//Data Type "GOOD, BROKEN"
  required:true,//validate
},
},{ collection: 'recyclingProduct' });

const RecyclingProduct = mongoose.model('RecyclingProduct', recyclingProductSchema);

module.exports = RecyclingProduct;