import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

const Events = () => {
    const defaultImage = 'https://ncas.nirmalacollege.edu.in/images/sliders/slider30.jpg?2035699757'; // Default image URL
    const [events, setEvents] = useState([]); // State to store events

    // Fetch events when the component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data); // Set events from the response
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom color='white' fontWeight='bold'>
                Upcoming Events
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {events.map(event => (
                    <Card key={event._id} sx={{ maxWidth: '345px', width: '100%' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={event.photo ? `http://localhost:5000/${event.photo}` : defaultImage} // Use uploaded image or default
                            alt={event.eventName}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {event.eventName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {event.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Events;
