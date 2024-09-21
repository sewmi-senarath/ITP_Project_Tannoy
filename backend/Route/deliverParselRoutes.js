const express = require("express");
const router = express.Router();
//Insert Model
const parselModel = require("../Model/deliverParselModel");
//Insert User Controller
const parselController = require("../Controlers/deliverParselControllers");

router.get("/", parselController.getAllParsel);
router.post("/", parselController.addParsel);
//" /:id - meka user control eke id ekata dunn ekath ekka match wenn oni"
router.get("/:id", parselController.getById);
router.put("/:id", parselController.updateParsel);
router.delete("/:id", parselController.deleteParsel);



//export
module.exports = router;