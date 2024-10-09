const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  //Create data for form
  productName:{
    type:String,//Data Type
    required:true,//validate
  },
  productId:{
    type:String,//Data Type
    required:true,//validate
  },
  quantity:{
    type:Number,//Data Type
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
  date: {
    type: Date, // Data Type
    default: Date.now, // Set the default value to the current date and time
    required: true, // validate
  },
},{ collection: 'product' });

const Product = mongoose.model('product', productSchema);

module.exports = Product;