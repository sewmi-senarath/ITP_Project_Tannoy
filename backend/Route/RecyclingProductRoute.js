const express = require("express");
const router = express.Router();
//Insert Model
const RecyclingProduct = require("../Model/RecyclingProductModel");
//Insert RecyclingProduct Controller
const RecyclingProductController = require("../Controlers/RecyclingProductControlles");

router.get("/", RecyclingProductController.getAllRecyclingProducts);
router.post("/", RecyclingProductController.addRecyclingProducts);
router.get("/:id", RecyclingProductController.getById);
router.put('/:id', RecyclingProductController.updateRecyclingProduct);
router.delete("/:id", RecyclingProductController.deleteRecyclingProduct);


//export router
module.exports = router;