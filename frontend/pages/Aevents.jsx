import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import axios from 'axios';

const defaultImage = 'https://ncas.nirmalacollege.edu.in/images/sliders/slider30.jpg?2035699757'; // Default image URL

const Aevents = () => {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({
        photo: null,
        eventName: '',
        description: ''
    });
    const [editingEvent, setEditingEvent] = useState(null); // State to track which event is being edited

    // Fetch existing events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handlePhotoChange = (e) => {
        setForm({
            ...form,
            photo: e.target.files[0] // Store the file directly
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!form.eventName || !form.description || !form.photo) {
            alert('Event name, description, and photo are required.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', form.photo);
        formData.append('eventName', form.eventName);
        formData.append('description', form.description);

        try {
            const response = await axios.post('http://localhost:5000/api/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setEvents([...events, response.data]); // Update state with newly added event
            setForm({ photo: null, eventName: '', description: '' }); // Reset form
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Error adding event. Please check the console for more details.'); // Alert the user in case of an error
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${eventId}`);
            setEvents(events.filter(event => event._id !== eventId)); // Remove deleted event from state
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEditEvent = async (event) => {
        // Set the editing event
        setEditingEvent(event);
        setForm({
            eventName: event.eventName,
            description: event.description,
            photo: null // Reset photo when editing
        });
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        if (form.photo) {
            formData.append('photo', form.photo); // Include new photo if available
        }
        formData.append('eventName', form.eventName);
        formData.append('description', form.description);

        try {
            const response = await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setEvents(events.map(e => (e._id === editingEvent._id ? response.data : e))); // Update event in state
            setForm({ photo: null, eventName: '', description: '' }); // Reset form
            setEditingEvent(null); // Clear editing state
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom align="center" color='white' sx={{ fontWeight: 'bold' }}>
                    {editingEvent ? 'Edit Event' : 'Add New Event'}
                </Typography>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        marginBottom: '20px',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}
                >
                    <form onSubmit={editingEvent ? handleUpdateEvent : handleSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <TextField
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                sx={{ marginRight: '20px', flexGrow: 1 }}
                            />
                            {form.photo && (
                                <Box sx={{ flexShrink: 0 }}>
                                    <img src={URL.createObjectURL(form.photo)} alt="Event" style={{ width: '150px', height: 'auto', borderRadius: '4px' }} />
                                </Box>
                            )}
                        </Box>
                        <TextField
                            label="Event Name"
                            name="eventName"
                            value={form.eventName}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            sx={{ marginBottom: '10px' }}
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            required
                            multiline
                            rows={4}
                            fullWidth
                            sx={{ marginBottom: '10px' }}
                        />
                        <Button type="submit" variant="contained" sx={{backgroundColor:"rgb(30, 30, 80)"}} >
                            {editingEvent ? 'Update Event' : 'Add Event'}
                        </Button>
                    </form>
                </Box>

                <Typography variant="h5" gutterBottom align="center" color='white' sx={{ fontWeight: 'bold' }}>
                    Events List
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {events.map((event) => {
                        const imageUrl = `http://localhost:5000/${event.photo}`; // Construct the full image URL

                        return (
                            <Grid item xs={12} sm={6} md={4} key={event._id}>
                                <Card sx={{ maxWidth: 345, margin: 'auto', border: '1px solid #ccc' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={event.photo ? imageUrl : defaultImage} // Use constructed URL for image
                                        alt={event.eventName}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {event.eventName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {event.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                            <Button variant="outlined" color="primary" onClick={() => handleEditEvent(event)}>
                                                Edit
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={() => handleDeleteEvent(event._id)}>
                                                Delete
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
};

export default Aevents;
