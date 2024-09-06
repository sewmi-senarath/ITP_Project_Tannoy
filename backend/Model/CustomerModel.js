const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
 

const customerSchema =  mongoose.Schema({
 
  name:{
    type:String,
    required:[true,"Please add a name"]
  },
  email:{
    type:String,
    required:[true,"please add an email"],
    unique:true,
    trim:true,
    match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,"Please add a valid email"]  
  },
  password:{
    type:String,
    required:[true,"Please add a password"],
    minlength:[6,"Password must be at least 6 characters long"],
    //maxlength:[12,"Password must not be at more than 12 characters long"],//

  },
  photo:{
    type:String,
    required:[true,"Please add a photo"],
    default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ffavpng.com%2Fpng_view%2Fuser-avatar-united-states-avatar-organization-information-png%2FfJaY9g9i&psig=AOvVaw0QxjQOkD-EAC4X0pd9qhAL&ust=1724921008935000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjondill4gDFQAAAAAdAAAAABAE"
  },
  phone:{
    type:String,
    default:"+94" 
  },

  bio:{
      type:String,
      maxlength:[100,"Bio must not be more than 100 characters long"],
      default:"bio"
    },
  },
  {
    timestamps:true
  }
);

//encrypt pw before saving DB
customerSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    return next();
  }
  
  // hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
  
});

const crm = mongoose.model("crm",customerSchema);
module.exports = crm;