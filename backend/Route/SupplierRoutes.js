const express = require("express");
const router = express.Router();
const SupplierController = require("../Controlers/SupplierController"); 


router.get('/', SupplierController.getAllSuppliers);
router.get('/:id', SupplierController.getSupplierById);
router.post('/', SupplierController.addSupplier);
router.put('/:id', SupplierController.updateSupplier);
router.delete('/:id', SupplierController.deleteSupplier);

module.exports = router;


