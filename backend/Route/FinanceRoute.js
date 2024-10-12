const express = require('express');
const router = express.Router();

//Insert Model
const Finance = require("../Model/FinanceModel");
//Insert User Controller
const FinanceController = require("../Controlers/FinanceController");

router.post('/', FinanceController.addFinance);
router.get('/monthly', FinanceController.getFinanceWithinMonth);
router.delete('/:id', FinanceController.deleteFinance);

module.exports = router;
