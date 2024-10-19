import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Container, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const UserProfileCard = styled(Card)({
    maxWidth: 345,
    margin: 'auto',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const ProfilePicture = styled(CardMedia)({
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    margin: 'auto',
});

const Auser = () => {
    const [users, setUsers] = useState([]); // State to store user data
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
    const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user ID for deletion
    const defaultImage = 'https://th.bing.com/th/id/OIP.spVmqLEfQC9nkyEUsmJGWAHaHa?w=196&h=196&c=7&r=0&o=5&pid=1.7'; // Default profile picture

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users'); // Ensure this endpoint exists
                setUsers(response.data); // Set users from the response
            } catch (error) {
                console.error('Error fetching users:', error.message); // Log the error message
                alert('Unable to fetch users. Please try again later.'); // Alert the user
            }
        };

        fetchUsers();
    }, []);

    // Handle user removal
    const handleRemove = (userId) => {
        setSelectedUserId(userId); // Set the user ID for deletion
        setOpenDialog(true); // Open the confirmation dialog
    };

    // Confirm and delete user
    const confirmRemoveUser = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteuser/${selectedUserId}`); // Call the delete API
            setUsers(users.filter((user) => user._id !== selectedUserId)); // Remove the user from the list in the UI
            console.log('User removed successfully!');
            
        } catch (error) {
            console.error('Error removing user:', error.message);
            
        } finally {
            setOpenDialog(false); // Close the dialog after the operation
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom align="center" color='#F57c00' sx={{ fontWeight: 'bold' }}>
                    User List
                </Typography>
                
                <Grid container spacing={2} justifyContent="center">
                    {users.length > 0 ? (
                        users
                        .filter(user => user.Role === 'user') // Show only users with role === 'user'
                        .map((user) => (
                            <Grid item xs={12} sm={6} md={4} key={user._id}>
                                <UserProfileCard>
                                    <ProfilePicture
                                        component="img"
                                        image={defaultImage} // Always use the default image
                                        alt={user.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {user.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Email: {user.email}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Course: {user.course || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Semester: {user.sem || 'N/A'}
                                        </Typography>
                                        {/* Remove Button */}
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{ mt: 2 }}
                                            onClick={() => handleRemove(user._id)} // Open confirmation dialog
                                        >
                                            Remove
                                        </Button>
                                    </CardContent>
                                </UserProfileCard>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" align="center" color="text.secondary">
                            No users found.
                        </Typography>
                    )}
                </Grid>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirm Removal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove this user? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmRemoveUser} color="error">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Auser;
