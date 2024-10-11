const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parselSchema = new Schema({
  //forms wala create krna data tika dann
  orderId:{
    type:String,
    required:true,
  },
  fullName:{
    type:String,//Data Type
    required:true,//validate
  },
  phoneNo:{
    type:Number,//Data Type
    required:true,//validate
  },
  email:{
    type:String,//Data Type
    required:true,//validate
  },
  address:{
    type:String,//Data Type
    required:true,//validate
  },
  postalCode:{
    type:String,//Data Type
    required:true,//validate
  },
  productType:{
    type:String,//Data Type
    required:true,//validate
  },
  productQty:{
    type:Number,//Data Type
    required:true,//validate
  },
  status:{
    type:String,//Data Type
    required:true,//validate
    enum: ["Confirm Delivery", "Start Packaging", "On the way to Warehouse", "Departure from Warehouse", "Delivered"]
  }
  
},{ collection: 'parsels' });

const parsel = mongoose.model('Parsel', parselSchema);

module.exports = parsel;