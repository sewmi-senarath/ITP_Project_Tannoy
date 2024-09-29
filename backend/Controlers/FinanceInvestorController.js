//Insert the model
const Investor = require("../Model/FinanceInvestorModel");


//Display data
const getAllInvestors = async(req, res, next) => {
  
  let investors;

  try{
    investors = await Investor.find();
  }catch (err){
    console.log(err);
  }
  // If Investor not found 
  if(!investors){
    return res.status(404).json({message:"Investor not found ..."})
  }

  //Displaying all investors 
  return res.status(200).json({investors});
};

//Insert investor data 
const addInvestors = async(req, res, next) => {
  const {name, dob, email, maidenname, nic, accountnum, 
    bankname, accname, invtdate, amt, percentage
  } = req.body;

  let investors;

  try {
    investors = new Investor({ name, dob, email, maidenname, nic, accountnum, 
      bankname, accname, invtdate, amt, percentage });
    await investors.save();
  }catch(err){
    console.log(err);
  }

  // Can't insert data of investors 
  if(!investors){
    return res.status(404).json({message: "Unable to add investor ..."});
  }else{
    return res.status(200).json({investors})
  }
}

//get Investor by Id
const getByInvId = async(req, res, next) => {
  const id = req.params.id;

  let investor;

  try{
    investor = await Investor.findById(id);
  } catch(err){
    console.log(err)
  }

  // not available users
  if(!investor){
    return res.status(404).json({message: "Investor not Found"});
  }else{
    return res.status(200).json({investor})
  }
}


//Update User details
const updateInv = async(req, res, next) => {
  const id = req.params.id;
  const { name, dob, gmail, maidenname, nic, accountnum, 
    bankname, accname, invtdate, amt, percentage} = req.body;

  let investor;

  try{
    investor = await Investor.findByIdAndUpdate(id,
      {
      name:name, 
      dob:dob, 
      email:gmail, 
      maidenname:maidenname, 
      nic:nic, 
      accountnum:accountnum, 
      bankname:bankname, 
      accname:accname, 
      invtdate:invtdate, 
      amt:amt, 
      percentage:percentage
    });
    investor = await Investor.save();
  }catch(err){
    console.log(err);
  }

  // not available users
  if(!investor){
    return res.status(404).json({message: "Unable to update investor details"});
  }else{
    return res.status(200).json({investor})
  }

};

//Delete user Detail
const deleteInvestor = async(req, res, next) => {
  const id = req.params.id;

  let investor;

  try{
    investor = await Investor.findByIdAndDelete(id)
  }catch(err){
    console.log(err);
  }

  // not available users
  if(!investor){
    return res.status(404).json({message: "Unable to Delete Investor details"});
  }else{
    return res.status(200).json({investor})
  }
}

//export the getAllInvestors functions
exports.getAllInvestors = getAllInvestors;
//export the addInvestors functions
exports.addInvestors = addInvestors;
//export the getByInvId functions
exports.getByInvId = getByInvId;
//export updateInv functions
exports.updateInv = updateInv;
//export deleteInvestor functions
exports.deleteInvestor = deleteInvestor;