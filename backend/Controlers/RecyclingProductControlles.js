//insert the model
const RecyclingProduct = require("../Model/RecyclingProductModel");


//display data
const getAllRecyclingProducts = async(req, res, next) => {
  
  let RecyclingProducts;

  try{
    RecyclingProducts = await RecyclingProduct.find();
  }catch (err){
    console.log(err)
  }
  //if recyclingProduct not found
  if(!RecyclingProducts){
    return res.status(404).json({message:"RecyclingProduct not found"})
  }

  //dsipaly all recyclingProducts
  return res.status(200).json({RecyclingProducts});
};

//data insert
const addRecyclingProducts = async(req, res, next) => {
  const {recyclingProductName, quantity, stage, quality, status, date, machineName, machineCondition } = req.body;

  let recyclingProduct;

  try {
    recyclingProduct = new RecyclingProduct({recyclingProductName, quantity, stage, quality, status, date,machineName, machineCondition  });
    await recyclingProduct.save();
  }catch(err){
    console.log(err);
  }

  // don't insert recyclingProducts
  if(!recyclingProduct){
    return res.status(404).json({message: "Unable to add recyclingProducts"});
  }else{
    return res.status(200).json({recyclingProduct})
  }
}

//get RecyclingProducts by id
const getById = async(req, res, next) => {
  const id = req.params.id;

  let recyclingProduct;

  try{
    recyclingProduct = await RecyclingProduct.findById(id);
  } catch(err){
    console.log(err)
  }

  // not available RecyclingProducts
  if(!recyclingProduct){
    return res.status(404).json({message: "RecyclingProduct not Found"});
  }else{
    return res.status(200).json({recyclingProduct})
  }
}


//Update recyclingProduct details
const updateRecyclingProduct = async(req, res, next) => {
  const id = req.params.id;
  const {recyclingProductName, quantity, stage, quality, status, date, machineName, machineCondition} = req.body;

  let recyclingProducts;

  try{
    recyclingProducts = await RecyclingProduct.findByIdAndUpdate(id,
      {recyclingProductName:recyclingProductName, quantity:quantity, stage:stage, quality:quality, status:status, date:date, machineName:machineName, machineCondition:machineCondition });
      recyclingProducts = await recyclingProducts.save();
  }catch(err){
    console.log(err);
  }

  // not available recyclingProducts
  if(!recyclingProducts){
    return res.status(404).json({message: "Unable to update recyclingProduct details"});
  }else{
    return res.status(200).json({recyclingProducts})
  }

}

//Delete recyclingProduct Detail
const deleteRecyclingProduct = async(req, res, next) => {
  const id = req.params.id;

  let recyclingProduct;

  try{
    recyclingProduct = await RecyclingProduct.findByIdAndDelete(id)
  }catch(err){
    console.log(err);
  }

  // not available recyclingProduct
  if(!recyclingProduct){
    return res.status(404).json({message: "Unable to Delete recyclingProduct details"});
  }else{
    return res.status(200).json({recyclingProduct})
  }
}

//export the getAllRecyclingProducts functions
exports.getAllRecyclingProducts = getAllRecyclingProducts;
//export the addRecyclingProduct functions
exports.addRecyclingProducts = addRecyclingProducts;
//export the get recyclingProduct by id functions
exports.getById = getById;
//export update functions
exports.updateRecyclingProduct = updateRecyclingProduct;
//export delete functions
exports.deleteRecyclingProduct = deleteRecyclingProduct;