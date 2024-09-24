const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //forms wala create krna data tika dann
  name:{
    type:String,//Data Type
    required:true,//validate
  },
  email:{
    type:String,//Data Type
    required:true,//validate
  },
  password:{
    type:String,//Data Type
    required:true,//validate
  },
},{ collection: 'register' });

const Register = mongoose.model('Register', userSchema);

module.exports = Register;