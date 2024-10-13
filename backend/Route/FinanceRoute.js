
const express = require('express');
const router = express.Router();
const {addFinance,getFinanceWithinMonth} = require('../Controlers/FinanceController');
const {deleteFinance} = require('../Controlers/FinanceController');
const {getAllFinance} = require('../Controlers/FinanceController');

router.post('/', addFinance);
router.get('/monthly', getFinanceWithinMonth);
router.delete('/:id', deleteFinance);
router.get('/', getAllFinance);

module.exports = router;