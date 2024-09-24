//Insert the model
const FinanceInvestor = require("../Model/FinanceInvestorModel");


//Display all registered investors
const getAllInvestors = async(req, res, next) => {
  
  let investors ;

  try{
    investors = await FinanceInvestor.find();
  }catch (err){
    console.log(err)
  }
  // If no investors are found
  if(!investors){
    return res.status(404).json({message:"No Investor Found"})
  }

  //To display all investors 
  return res.status(200).json({investors});
};

//Inserting new investor data
const addFinanceInvestor = async(req, res, next) => {
  const {
    name, 
    dob, 
    gmail, 
    maidenname, 
    nic, 
    accountnum, 
    bankname, 
    accname, 
    invtdate, 
    amt, 
    percentage} = req.body;

  let investor;

  try {
    investor = new FinanceInvestor({  name, 
      dob, 
      gmail, 
      maidenname, 
      nic, 
      accountnum, 
      bankname, 
      accname, 
      invtdate, 
      amt, 
      percentage });
    await investor.save();
  }catch(err){
    console.log(err);
  }

  // Unble to insert investor details
  if(!investor){
    return res.status(404).json({message: "Unable to add investor"});
  }else{
    return res.status(200).json({investor})
  }
}

// Getting an investor ID
const getInvestorById = async(req, res, next) => {
  const id = req.params.id;

  let investor;

  try{
    investor = await FinanceInvestor.findById(id);
  } catch(err){
    console.log(err)
  }

  // If investor is not found
  if(!investor){
    return res.status(404).json({message: "Investor not Found"});
  }else{
    return res.status(200).json({investor})
  }
}


//Update Investor details 
const updateFinanceInvestor = async(req, res, next) => {
  const id = req.params.id;
  const {
    name, dob, gmail, maidenname, nic, accountnum, bankname, accname, invtdate, amt, percentage
  } = req.body;

  let investor;

  try{
    investor = await FinanceInvestor.findByIdAndUpdate(id,
      {name,
        dob,
        gmail,
        maidenname,
        nic,
        accountnum,
        bankname,
        accname,
        invtdate,
        amt,
        percentage});
      investor = await investor.save();
  }catch(err){
    console.log(err);
  }

  // Investor details update fails
  if(!investor){
    return res.status(404).json({message: "Unable to update investor details"});
  }else{
    return res.status(200).json({investor})
  }

}

// Delete Investor Details
const deleteFinanceInvestor = async(req, res, next) => {
  const id = req.params.id;

  let investor;

  try{
    investor = await FinanceInvestor.findByIdAndDelete(id)
  }catch(err){
    console.log(err);
  }

  // Investor's details deletion fails 
  if(!investor){
    return res.status(404).json({message:"Unable to delete investor"});
  }else{
    return res.status(200).json({message: "Investor successfully deleted"})
  }
}

// Export the functions
//export the getAllInvestors functions
exports.getAllInvestors = getAllInvestors;
//export the addFinanceInvestor functions
exports.addFinanceInvestor = addFinanceInvestor;
//export the getInvestorById functions
exports.getInvestorById = getInvestorById;
//export updateFinanceInvestor functions
exports.updateFinanceInvestor = updateFinanceInvestor;
//export deleteFinanceInvestor functions
exports.deleteFinanceInvestor = deleteFinanceInvestor;