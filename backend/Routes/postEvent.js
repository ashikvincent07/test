const express = require('express');
const multer = require('multer');
const path = require('path');
const Event = require('../Model/event'); // Adjust the path as necessary

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to prevent conflicts
    },
});

const upload = multer({ storage });

// GET /api/events - Fetch all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/events - Add a new event
router.post('/', upload.single('photo'), async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { eventName, description } = req.body;

    if (!eventName || !description) {
        return res.status(400).json({ message: 'Event name and description are required.' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'Photo upload is required.' });
    }

    const newEvent = new Event({
        eventName,
        description,
        photo: req.file.path, // Save the uploaded file path
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ message: 'Failed to save event.', error: error.message });
    }
});

// DELETE /api/events/:id - Delete an event by ID
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/events/:id - Update an event by ID
router.put('/:id', upload.single('photo'), async (req, res) => {
    const { eventName, description } = req.body;
    const updatedEvent = { eventName, description };

    // If a new photo is uploaded, include its path in the update
    if (req.file) {
        updatedEvent.photo = req.file.path; // Save the uploaded file path
    }

    try {
        const event = await Event.findByIdAndUpdate(req.params.id, updatedEvent, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
