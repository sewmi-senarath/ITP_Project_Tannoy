const express = require("express");
const router = express.Router();

//Insert Model
const Investor = require("../Model/FinanceInvestorModel");
//Insert User Controller
const FinanceInvestorController = require("../Controlers/FinanceInvestorController");

router.get("/", FinanceInvestorController.getAllInvestors);
router.post("/", FinanceInvestorController.addInvestors);
//" /:id - meka user control eke id ekata dunn ekath ekka match wenn oni"
router.get("/:id", FinanceInvestorController.getByInvId);
router.put("/:id", FinanceInvestorController.updateInv);
router.delete("/:id", FinanceInvestorController.deleteInvestor);


//export
module.exports = router;