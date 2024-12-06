const express = require('express');
const router = express.Router();
const User = require('../Model/user');



router.use(express.json());



// Signup API


router.post('/signup', async (req, res) => {
    const { name, email, sem, course, password, cpassword } = req.body;

    // Check if passwords match
    if (password !== cpassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Create a new user
        const newUser = new User({
            name,
            email,
            sem,
            course,
            password, // Store the password as is (not recommended for production)
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});






// Login API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches (in a real app, you'd hash passwords)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Successful login, return user data
        res.status(200).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            sem: user.sem,
            course: user.course,
            role: user.Role
        });
        
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
});


// Route to fetch user profile by ID
// Assuming you're using Express.js for the backend
router.get('/viewmypro/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json([user]); // Send the user data back as an array to match your frontend
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).json({ message: 'Server error while fetching user data' });
    }
});





// Add this route to your existing Express router to fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Return users as JSON
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
});



// Route to edit user profile by ID
router.put('/editprofile/:userId', async (req, res) => {
    const { userId } = req.params; // Extract userId from request parameters

    // Extracting data from request body with distinct variable names
    const { name: newName, email: newEmail, sem: newSem, course: newCourse, password: newPassword } = req.body;

    try {
        // Find the user by ID
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate course and semester inputs
        const validCourses = ['BSc IT', 'BSc CS', 'BCA'];
        const validSemesters = [1, 2, 3, 4, 5, 6];

        if (newSem && !validSemesters.includes(parseInt(newSem))) {
            return res.status(400).json({ message: 'Invalid semester. Allowed values are 1 to 6.' });
        }

        if (newCourse && !validCourses.includes(newCourse)) {
            return res.status(400).json({ message: 'Invalid course. Allowed values are BSc IT, BSc CS, and BCA.' });
        }

        // Update the user's details with new data or retain old data
        existingUser.name = newName || existingUser.name;
        existingUser.email = newEmail || existingUser.email;
        existingUser.sem = newSem || existingUser.sem;
        existingUser.course = newCourse || existingUser.course;

        // Update password directly without hashing (in plain text)
        if (newPassword) {
            existingUser.password = newPassword;
        }

        // Save the updated user details to the database
        await existingUser.save();

        // Return a success message along with the updated user data
        res.status(200).json({ message: 'Profile updated successfully', updatedUser: existingUser });
    } catch (error) {
        // Log any server error
        console.error('Error updating profile:', error);

        // Handle Mongoose validation error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: error.errors });
        }

        // Send a 500 error for any other unexpected issues
        res.status(500).json({ message: 'Server error while updating profile' });
    }
});


// Delete user API
router.delete('/deleteuser/:uid', async (req, res) => {
    const { uid } = req.params; // Extract uid (user ID) from the request parameters

    try {
        // Find the user by ID and delete
        const deletedUser = await User.findByIdAndDelete(uid);

        // Check if the user exists
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return a success message after deletion
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        // Log any server error
        console.error('Error deleting user:', error.message);

        // Handle Mongoose error or any unexpected issues
        res.status(500).json({ message: 'Server error while deleting user' });
    }
});


module.exports = router;





