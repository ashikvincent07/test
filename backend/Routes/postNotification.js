const express = require('express');
const multer = require('multer');
const path = require('path');
const Notification = require('../Model/notification'); // Adjust the path as necessary

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

// GET /api/notifications - Fetch all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/notifications - Add a new notification
router.post('/', upload.single('photo'), async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { notificationName, description } = req.body;

    if (!notificationName || !description) {
        return res.status(400).json({ message: 'Notification name and description are required.' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'Photo upload is required.' });
    }

    const newNotification = new Notification({
        notificationName,
        description,
        photo: req.file.path, // Save the uploaded file path
    });

    try {
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        console.error('Error saving notification:', error);
        res.status(500).json({ message: 'Failed to save notification.', error: error.message });
    }
});

// DELETE /api/notifications/:id - Delete a notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/notifications/:id - Update a notification by ID
router.put('/:id', upload.single('photo'), async (req, res) => {
    const { notificationName, description } = req.body;
    const updatedNotification = { notificationName, description };

    // If a new photo is uploaded, include its path in the update
    if (req.file) {
        updatedNotification.photo = req.file.path; // Save the uploaded file path
    }

    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, updatedNotification, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
