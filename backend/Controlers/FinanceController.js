const Finance = require('../Model/FinanceModel');

// Add new finance entry
const addFinance = async (req, res) => { 
    const { amount } = req.body;
    try {
        const finance = new Finance({ ...req.body, amount: Number(amount) });
        await finance.save();
        res.status(201).json(finance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all finance data
const getAllFinance = async (req, res) => {
    try {
        const financeData = await Finance.find(); // Retrieve all entries
        res.json(financeData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get finance data within a month
const getFinanceWithinMonth = async (req, res) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const financeData = await Finance.find({ date: { $gte: oneMonthAgo } });
        res.json(financeData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete finance entry
const deleteFinance = async (req, res) => {
    const { id } = req.params;
    try {
        const finance = await Finance.findByIdAndDelete(id);
        if (!finance) {
            return res.status(404).json({ message: 'Finance entry not found' });
        }
        res.status(200).json({ message: 'Finance entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addFinance, getAllFinance, getFinanceWithinMonth, deleteFinance };
