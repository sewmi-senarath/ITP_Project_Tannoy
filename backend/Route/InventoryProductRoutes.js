const express = require("express");
const router = express.Router();
const InventoryProductController = require("../Controlers/InventoryProductControllers"); 


router.get('/', InventoryProductController.getAllProducts);
router.get('/:id', InventoryProductController.getProductById);
router.post('/', InventoryProductController.addProduct);
router.put('/:id', InventoryProductController.updatedProduct);
router.delete('/:id', InventoryProductController.deleteProduct);

module.exports = router;
