import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Button,
    TextField,
    Modal,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import axios from 'axios';

const Aprofile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const defaultProfilePicture = 'https://cdn-icons-png.flaticon.com/512/7153/7153150.png';

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User ID not found. Please log in.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/viewmypro/${userId}`);
                const userData = response.data[0];
                setUser(userData);
                setUpdatedData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);

    const handleEditButtonClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleInputChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        try {
            const response = await axios.put(`http://localhost:5000/api/editprofile/${userId}`, updatedData);
            setMessage('Profile updated successfully');
            setUser(response.data.updatedUser);
            setOpenModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile');
        }
    };

    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);
    };

    const handleLogoutConfirm = () => {
        setLogoutDialogOpen(false);
        localStorage.removeItem('userId'); // Clear user ID from local storage
        window.location.href = '/'; // Redirect to home page after logout
    };

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    };

    const handleSemesterChange = (e) => {
        const sem = parseInt(e.target.value, 10);
        if (sem >= 1 && sem <= 6) {
            setUpdatedData({ ...updatedData, sem });
        }
    };

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                padding: '20px',
                maxWidth: '600px',
                margin: 'auto',
                textAlign: 'center',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Avatar
                alt={user.name}
                src={defaultProfilePicture}
                sx={{ width: 100, height: 100, margin: 'auto', marginBottom: '20px' }}
            />
            <Typography variant="h5" gutterBottom>
                {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {user.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {user.course}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Semester: {user.sem}
            </Typography>

            <Button variant="outlined" color="primary" onClick={handleEditButtonClick} sx={{ marginTop: '20px' }}>
                Edit Profile
            </Button>

            {/* Wrap buttons in a Box to manage layout */}
            <Box sx={{ marginTop: '20px' }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleLogoutClick}
                    sx={{ marginLeft: '10px' }} // Adding margin for spacing
                >
                    Logout
                </Button>
            </Box>

            {message && <Alert severity="success" sx={{ marginTop: '20px' }}>{message}</Alert>}

            {/* Modal for editing profile */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        Edit Profile
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            name="name"
                            value={updatedData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            value={updatedData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Semester"
                            name="sem"
                            type="number"
                            value={updatedData.sem}
                            onChange={handleSemesterChange}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="course-select-label">Course</InputLabel>
                            <Select
                                labelId="course-select-label"
                                id="course-select"
                                name="course"
                                value={updatedData.course}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="BSc IT">BSc IT</MenuItem>
                                <MenuItem value="BSc CS">BSc CS</MenuItem>
                                <MenuItem value="BCA">BCA</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Leave blank to keep the same"
                            onChange={handleInputChange}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '20px' }}>
                            Save Changes
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Logout confirmation dialog */}
            <Dialog
                open={logoutDialogOpen}
                onClose={handleLogoutCancel}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">{"Confirm Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Aprofile;
