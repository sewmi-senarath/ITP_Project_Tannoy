const express = require('express');
const router = express.Router();
const Inquire = require('../Model/Inquire'); 
const { v4: uuidv4 } = require('uuid');

// CREATE a new inquiry

router.post('/', async (req, res) => {
    try {
        const { user_id, name, email, subject, description } = req.body;
        
        let inquire_id;
        let newInquire;
        let savedInquire;

        // Attempt to generate a unique inquire_id
        for (let i = 0; i < 5; i++) {  // Try up to 5 times to avoid duplicates
            inquire_id = 'INQ-' + uuidv4().slice(0, 8).toUpperCase();

            // Create a new inquiry object
            newInquire = new Inquire({
                inquire_id,
                user_id,
                name,
                email,
                date: new Date(),
                subject,
                description,
                satisfaction: 'Neutral'  // Default satisfaction
            });

            try {
                savedInquire = await newInquire.save();
                console.log("sucesssssssss")
                break; // Success, break the loop
            } catch (err) {
                if (err.code === 11000) {  // Duplicate key error
                    console.warn(`Duplicate inquire_id: ${inquire_id}, retrying...`);
                    continue; // Try generating a new ID
                } else {
                    throw err; // Some other error, exit
                }
            }
        }

        if (!savedInquire) {
            return res.status(500).json({ message: 'Failed to create inquiry after multiple attempts.' });
        }

        res.status(201).json({
            message: 'Inquiry created successfully',
            inquiry: savedInquire
        });
    } catch (error) {
        console.error('Error saving inquiry:', error);
        res.status(500).json({ message: 'Failed to create inquiry', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquire.find();

        if (!inquiries || inquiries.length === 0) {
            return res.status(404).json({ message: 'No inquiries found' });
        }

        res.status(200).json({
            message: 'Inquiries retrieved successfully',
            inquiries
        });
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ message: 'Failed to retrieve inquiries', error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const inquiry = await Inquire.findById(req.params.id); 

        // Check if the inquiry exists
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        // Respond with the inquiry details
        res.status(200).json({
            message: 'Inquiry retrieved successfully',
            inquiry 
        });
    } catch (error) {
        console.error('Error fetching inquiry:', error.message);
        res.status(500).json({ message: 'Failed to retrieve inquiry', error: error.message });
    }
});



// UPDATE the satisfaction level of an inquiry by inquire_id
router.put('/:inquire_id/satisfaction', async (req, res) => {
    try {
        const { satisfaction } = req.body;
        const validSatisfactions = ['Positive', 'Negative', 'Neutral'];

        // Ensure satisfaction is valid
        if (!validSatisfactions.includes(satisfaction)) {
            return res.status(400).json({ message: 'Invalid satisfaction level' });
        }

        // Find the inquiry by inquire_id and update the satisfaction
        const updatedInquiry = await Inquire.findOneAndUpdate(
            { _id: req.params.inquire_id },
            { satisfaction },
            { new: true } // Return the updated document
        );

        if (!updatedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.status(200).json({
            message: 'Satisfaction updated successfully',
            inquiry: updatedInquiry
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update satisfaction', error });
    }
});

// GET all inquiries by user_id
router.get('/user/:user_id', async (req, res) => {
    try {
        const inquiries = await Inquire.find({ user_id: req.params.user_id });

        if (inquiries.length === 0) {
            return res.status(404).json({ message: 'No inquiries found for this user' });
        }

        res.status(200).json({
            message: 'Inquiries retrieved successfully',
            inquiries
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve inquiries', error });
    }
});

module.exports = router;
