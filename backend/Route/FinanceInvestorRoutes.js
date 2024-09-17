const express = require("express");
const router = express.Router();
//Insert Model
const FinanceInvestor = require("../Model/FinanceInvestorModel");
//Insert FinanceInvestorModel  Controller
const FinanceInvestorController = require("../Controlers/FinanceInvestorController");
//Get All investors
router.get("/", FinanceInvestorController.getAllUsers);
//Add new investor
router.post("/", FinanceInvestorController.addUsers);
//Get Investor By ID
router.get("/:id", FinanceInvestorController.getInvestorById);
//Delete Investor By ID
router.delete("/:id", FinanceInvestorController.deleteFinanceInvestor);
//Update Investor by ID
router.put("/:id", FinanceInvestorController.updateFinanceInvestor); 

//export
module.exports = router;

// oya wada karal thiyenne master branch eke
//mokda krnne