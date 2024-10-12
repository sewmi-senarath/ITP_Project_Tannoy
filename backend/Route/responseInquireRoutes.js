const express = require('express');
const router = express.Router();
const ResponseInquire = require('../Model/ResponseInquire');
const Inquire = require('../Model/Inquire');
const { v4: uuidv4 } = require('uuid');

// CREATE a response for a certain inquire
router.post('/response', async (req, res) => {
    try {
        const { inquire_id, response } = req.body;

        // Ensure the inquiry exists
        const existingInquire = await Inquire.findById(inquire_id);
        if (!existingInquire) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        let response_id;
        let newResponseInquire;
        let savedResponseInquire;

        // Attempt to generate a unique response_id
        for (let i = 0; i < 5; i++) {
            response_id = 'RES-' + uuidv4().slice(0, 8).toUpperCase();

            // Create a new response object
            newResponseInquire = new ResponseInquire({
                response_id,
                inquire_id,
                response
            });

            try {
                savedResponseInquire = await newResponseInquire.save();
                break; // Success, break the loop
            } catch (err) {
                if (err.code === 11000) {  // Duplicate key error
                    console.warn(`Duplicate response_id: ${response_id}, retrying...`);
                    continue;
                } else {
                    throw err;
                }
            }
        }

        if (!savedResponseInquire) {
            return res.status(500).json({ message: 'Failed to create response after multiple attempts.' });
        }

        const updatedInquire = await Inquire.findByIdAndUpdate(inquire_id,
            {
                responded: true,
                status: 'Responded'
            }
        );

        res.status(201).json({
            message: 'Response created successfully',
            responseInquire: savedResponseInquire
        });
    } catch (error) {
        console.error('Error saving response:', error);
        res.status(500).json({ message: 'Failed to create response', error });
    }
});



// UPDATE the status of an inquire
router.put('/:inquire_id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'completed', 'in-progress'];

        // Ensure status is valid
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find the inquire by inquire_id and update the status
        const updatedInquire = await Inquire.findOneAndUpdate(
            { inquire_id: req.params.inquire_id },
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedInquire) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.status(200).json({
            message: 'Status updated successfully',
            inquire: updatedInquire
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status', error });
    }
});

// GET response by inquire_id
router.get('/inquire/:inquire_id', async (req, res) => {
    try {
        const inquireId = req.params.inquire_id;
        console.log(inquireId);  // This logs correctly

        // Use find() instead of findBy() and ensure inquire_id is the correct field
        const responses = await ResponseInquire.find({ inquire_id: inquireId });

        if (responses.length === 0) {
            return res.status(404).json({ message: 'No responses found for this inquire' });
        }

        res.status(200).json({
            message: 'Responses retrieved successfully',
            responses
        });
    } catch (error) {
        console.error('Error retrieving responses:', error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to retrieve responses', error });
    }
});


// DELETE a response
router.delete('/:response_id', async (req, res) => {
    try {
        const response = await ResponseInquire.findOneAndDelete({ _id: req.params.response_id });

        if (!response) {
            return res.status(404).json({ message: 'Response not found' });
        }

        res.status(200).json({
            message: 'Response deleted successfully',
            response
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete response', error });
    }
});


router.put('/:response_id', async (req, res) => {
    try {
        const { response, status } = req.body;

        // Find and update the response
        const updatedResponse = await ResponseInquire.findOneAndUpdate(
            {_id: req.params.response_id },
            { response },
            { new: true } // Return the updated document
        );

        if (!updatedResponse) {
            return res.status(404).json({ message: 'Response not found' });
        }

        // If status is provided, update the associated inquire's status
        if (status) {
            const validStatuses = ['pending', 'completed', 'in-progress'];

            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }

            // Update the status of the associated inquire
            await Inquire.findByIdAndUpdate(
                updatedResponse.inquire_id,
                { status }
            );
        }

        res.status(200).json({
            message: 'Response updated successfully',
            response: updatedResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update response', error });
    }
});


module.exports = router;
