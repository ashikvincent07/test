const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    sem: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        default: "user"
    }
});

// Create the user model
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
