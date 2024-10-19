const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false // Photo is optional
    },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
