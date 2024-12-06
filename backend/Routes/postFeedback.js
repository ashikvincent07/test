const express = require('express');
const multer = require('multer');
const Feedback = require('../Model/feedback'); // Path remains unchanged

const router = express.Router();

// Set up multer for handling photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});
const upload = multer({ storage });

// Route for submitting feedback
router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const { text } = req.body; // Extract feedback text from the request body
        const photo = req.file ? req.file.path.replace(/\\/g, '/') : null; // Normalize path for the photo

        // Create new feedback entry
        const newFeedback = new Feedback({
            text,
            photo
        });

        await newFeedback.save(); // Save feedback to the database

        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error('Error submitting feedback:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error submitting feedback' });
    }
});

// Route for fetching all feedback (optional, for Afeedback)
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find(); // Fetch all feedbacks
        res.status(200).json(feedbacks); // Return feedbacks as a JSON response
    } catch (error) {
        console.error('Error fetching feedbacks:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching feedbacks' });
    }
});

// Make sure to export the router
module.exports = router;
