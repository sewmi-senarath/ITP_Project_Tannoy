//insert the model
const User = require("../Model/UserModel");


//display data
const getAllUsers = async(req, res, next) => {
  
  let Users;

  try{
    Users = await User.find();
  }catch (err){
    console.log(err)
  }
  //if user not found
  if(!Users){
    return res.status(404).json({message:"User not found"})
  }

  //dsipaly all users
  return res.status(200).json({Users});
};

//data insert
const addUsers = async(req, res, next) => {
  const {name, gmail, age, address} = req.body;

  let user;

  try {
    user = new User({ name, gmail, age, address });
    await user.save();
  }catch(err){
    console.log(err);
  }

  // don't insert users
  if(!user){
    return res.status(404).json({message: "Unable to add users"});
  }else{
    return res.status(200).json({user})
  }
}

//get user by id
const getById = async(req, res, next) => {
  const id = req.params.id;

  let user;

  try{
    user = await User.findById(id);
  } catch(err){
    console.log(err)
  }

  // not available users
  if(!user){
    return res.status(404).json({message: "User not Found"});
  }else{
    return res.status(200).json({user})
  }
}


//Update User details
const updateUser = async(req, res, next) => {
  const id = req.params.id;
  const {name, gmail, age, address} = req.body;

  let users;

  try{
    users = await User.findByIdAndUpdate(id,
      {name: name, gmail: gmail, age: age, address: address});
      users = await users.save();
  }catch(err){
    console.log(err);
  }

  // not available users
  if(!users){
    return res.status(404).json({message: "Unable to update user details"});
  }else{
    return res.status(200).json({users})
  }

}

//Delete user Detail
const deleteUser = async(req, res, next) => {
  const id = req.params.id;

  let user;

  try{
    user = await User.findByIdAndDelete(id)
  }catch(err){
    console.log(err);
  }

  // not available users
  if(!user){
    return res.status(404).json({message: "Unable to Delete user details"});
  }else{
    return res.status(200).json({user})
  }
}

//export the getAllUsers functions
exports.getAllUsers = getAllUsers;
//export the addUsers functions
exports.addUsers = addUsers;
//export the get users by id functions
exports.getById = getById;
//export update functions
exports.updateUser = updateUser;
//export delete functions
exports.deleteUser = deleteUser;