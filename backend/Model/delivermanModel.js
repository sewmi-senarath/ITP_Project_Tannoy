const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverManSchema = new Schema({
  //forms wala create krna data tika dann
  deverManName:{
    type:String,//Data Type
    required:true,//validate
  },
  vehicleType:{
    type:String,//Data Type
    required:true
  },
  LicensPlateNo:{
    type:String,//Data Type
    required:true
  },
  contactNo:{
    type:String,//Data Type
    required:true,//validate
  },
  areaOfRoute:{
    type:String,//Data Type
    required:true//validate
  },
  route:{
    type:String,//Data Type
    required:true,//validate
  },
  status:{
    type:String,//Data Type
    required:true,//validate
  },
  packageQty:{
    type:Number,//Data Type
    required:true//validate
  }
},{ collection: 'deliverTeam' });

const deliverTeam = mongoose.model('deliverTeam', deliverManSchema);

module.exports = deliverTeam;