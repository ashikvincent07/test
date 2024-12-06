import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Import Alert component
import axios from 'axios';

const Feedback = () => {
    const [feedback, setFeedback] = useState({ text: '', image: null });
    const [open, setOpen] = useState(false); // Snackbar open state
    const [message, setMessage] = useState(''); // Snackbar message
    const [severity, setSeverity] = useState('success'); // Snackbar severity

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleImageChange = (e) => {
        setFeedback({ ...feedback, image: e.target.files[0] });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('text', feedback.text);
        if (feedback.image) {
            formData.append('photo', feedback.image);
        }

        try {
            // Ensure the URL points to the correct backend endpoint
            const response = await axios.post('http://localhost:5000/api/feedback', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Feedback submitted successfully:', response.data);
            setFeedback({ text: '', image: null });
            setMessage('Feedback submitted successfully!'); // Set success message
            setSeverity('success'); // Set severity for Snackbar
            setOpen(true); // Open Snackbar
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setMessage('Error submitting feedback. Please try again.'); // Set error message
            setSeverity('error'); // Set severity for Snackbar
            setOpen(true); // Open Snackbar
        }
    };

    const handleClose = () => {
        setOpen(false); // Close Snackbar
    };

    return (
        <Box
            sx={{
                padding: '20px',
                maxWidth: '600px',
                margin: 'auto',
                marginTop:'110px',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #ddd',
                '@media (max-width:600px)': {
                    padding: '10px',
                    maxWidth: '100%',
                },
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: '24px',
                    textAlign: 'center',
                    marginTop: '20px', // Top margin for spacing
                    '@media (max-width:600px)': {
                        fontSize: '20px',
                    },
                }}
            >
                Submit Feedback
            </Typography>
            <TextField
                label="Your Feedback"
                name="text"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={feedback.text}
                onChange={handleInputChange}
                sx={{
                    marginBottom: '20px',
                    '@media (max-width:600px)': {
                        marginBottom: '10px',
                    },
                }}
            />
            <Button
                variant="contained"
                component="label"
                sx={{
                    backgroundColor:'rgb(30, 30, 80)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    marginBottom: '20px',
                    textAlign: 'center',
                    '@media (max-width:600px)': {
                        marginBottom: '10px',
                    },
                }}
            >
                Upload Image
                <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                    backgroundColor:'rgb(30, 30, 80)',
                    display: 'block',
                    width: '100%',
                }}
            >
                Submit
            </Button>

            {/* Snackbar for feedback submission */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default Feedback;
