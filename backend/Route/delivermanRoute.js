const express = require("express");
const router = express.Router();
//Insert Model
const deliverMans = require("../Model/delivermanModel");
//Insert User Controller
const deliverManController = require("../Controlers/delivermanControllers");

router.get("/", deliverManController.getAllUsers);
router.post("/", deliverManController.addUsers);
//" /:id - meka user control eke id ekata dunn ekath ekka match wenn oni"
router.get("/:id", deliverManController.getById);
router.delete("/:id", deliverManController.deleteUser);


//export
module.exports = router;