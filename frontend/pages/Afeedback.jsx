import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import axios from 'axios';

const Afeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const defaultImage = 'https://th.bing.com/th/id/OIP.oCWXA5hI1EA-e28VnaPwlwHaHa?w=218&h=218&c=7&r=0&o=5&pid=1.7'; // Default image URL

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/feedback'); // Adjust the URL if needed
                setFeedbacks(response.data); // Assuming the response data is an array of feedback
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedbacks();
    }, []); // Empty dependency array to run once on component mount

    return (
        <Container maxWidth="lg">
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom align="center" color='white' sx={{ fontWeight: 'bold' }}>
                    Feedback from Users
                </Typography>
                
                <Grid container spacing={2} justifyContent="center">
                    {feedbacks.map((feedback) => (
                        <Grid item xs={12} sm={6} md={4} key={feedback._id}>
                            <Card sx={{ maxWidth: 345, margin: 'auto', border: '1px solid #ccc', backgroundColor: 'white' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={feedback.photo ? `http://localhost:5000/${feedback.photo.replace(/\\/g, '/')}` : defaultImage} // Use default image if no photo
                                    alt="Feedback"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="body1" component="div">
                                        {feedback.text} {/* Display feedback text */}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: '10px' }}>
                                        {/* Display timestamp if available */}
                                        {new Date(feedback.createdAt).toLocaleString()} 
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Afeedback;
