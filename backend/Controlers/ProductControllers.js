//insert the model
const Product = require("../Model/ProductModel");


//display data
const getAllProducts = async(req, res, next) => {
  
  let Products;

  try{
    Products = await Product.find();
  }catch (err){
    console.log(err)
  }
  //if product not found
  if(!Products){
    return res.status(404).json({message:"Product not found"})
  }

  //dsipaly all products
  return res.status(200).json({Products});
};

//data insert
const addProducts = async(req, res, next) => {
  const {productName, productId, quantity, quality, status, date} = req.body;

  let product;

  try {
    product = new Product({ productName, productId, quantity, quality, status, date  });
    await product.save();
  }catch(err){
    console.log(err);
  }

  // don't insert products
  if(!product){
    return res.status(404).json({message: "Unable to add products"});
  }else{
    return res.status(200).json({product})
  }
}

//get Products by id
const getById = async(req, res, next) => {
  const id = req.params.id;

  let product;

  try{
    product = await Product.findById(id);
  } catch(err){
    console.log(err)
  }

  // not available Products
  if(!product){
    return res.status(404).json({message: "Product not Found"});
  }else{
    return res.status(200).json({product})
  }
}


//Update product details
const updateProduct = async(req, res, next) => {
  const id = req.params.id;
  const {productName,productId, quantity, quality, status, date} = req.body;

  let products;

  try{
    products = await Product.findByIdAndUpdate(id,
      {productName:productName, productId:productId,quantity:quantity, quality:quality, status:status, date:date });
      products = await products.save();
  }catch(err){
    console.log(err);
  }

  // not available products
  if(!products){
    return res.status(404).json({message: "Unable to update product details"});
  }else{
    return res.status(200).json({products})
  }

}

//Delete product Detail
const deleteProduct = async(req, res, next) => {
  const id = req.params.id;

  let product;

  try{
    product = await Product.findByIdAndDelete(id)
  }catch(err){
    console.log(err);
  }

  // not available product
  if(!product){
    return res.status(404).json({message: "Unable to Delete product details"});
  }else{
    return res.status(200).json({product})
  }
}

//export the getAllProducts functions
exports.getAllProducts = getAllProducts;
//export the addProduct functions
exports.addProducts = addProducts;
//export the get product by id functions
exports.getById = getById;
//export update functions
exports.updateProduct = updateProduct;
//export delete functions
exports.deleteProduct = deleteProduct;