const express = require("express");
const router = express.Router();

// Insert Model
const FinanceInvestor = require("../Model/FinanceInvestorModel");

// Insert FinanceInvestorModel Controller
const FinanceInvestorController = require("../Controlers/FinanceInvestorController");

// Get All investors
router.get("/", FinanceInvestorController.getAllInvestors); // Corrected function name

// Add new investor
router.post("/", FinanceInvestorController.addFinanceInvestor); // Corrected function name

// Get Investor By ID
router.get("/:id", FinanceInvestorController.getInvestorById);

// Delete Investor By ID
router.delete("/:id", FinanceInvestorController.deleteFinanceInvestor);

// Update Investor by ID
router.put("/:id", FinanceInvestorController.updateFinanceInvestor); 

// Export
module.exports = router;
