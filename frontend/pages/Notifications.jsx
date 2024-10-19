import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

const Notifications = () => {
    const defaultImage = 'https://ncas.nirmalacollege.edu.in/images/sliders/slider29.jpg?258842248'; // Default image URL
    const [notifications, setNotifications] = useState([]); // State to store notifications

    // Fetch notifications when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notifications');
                setNotifications(response.data); // Set notifications from the response
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom color='white' fontWeight='bold'>
                Notifications
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {notifications.map(notification => (
                    <Card key={notification._id} sx={{ maxWidth: '345px', width: '100%' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={notification.photo ? `http://localhost:5000/${notification.photo}` : defaultImage} // Use uploaded image or default
                            alt={notification.notificationName}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {notification.notificationName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {notification.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Notifications;
