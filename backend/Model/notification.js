const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notificationName: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true }, // Path to uploaded photo
});

module.exports = mongoose.model('Notification', notificationSchema);
