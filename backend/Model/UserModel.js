const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //forms wala create krna data tika dann
  name:{
    type:String,//Data Type
    required:true,//validate
  },
  gmail:{
    type:String,//Data Type
    required:true,//validate
  },
  age:{
    type:Number,//Data Type
    required:true,//validate
  },
  address:{
    type:String,//Data Type
    required:true,//validate
  }
});


module.exports = mongoose.model(
  "Customer",//file name
  userSchema // function name
)