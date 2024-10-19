const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true } // Ensure this matches your schema
});

module.exports = mongoose.model('Event', eventSchema);
