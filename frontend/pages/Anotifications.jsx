import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import axios from 'axios';

const defaultImage = 'https://ncas.nirmalacollege.edu.in/images/sliders/slider30.jpg?2035699757'; // Default image URL

const Anotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({
    photo: null,
    notificationName: '',
    description: ''
  });
  const [editingNotification, setEditingNotification] = useState(null); // State to track which notification is being edited

  // Fetch existing notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
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
    if (!form.notificationName || !form.description || !form.photo) {
      alert('Notification name, description, and photo are required.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', form.photo);
    formData.append('notificationName', form.notificationName);
    formData.append('description', form.description);

    try {
      const response = await axios.post('http://localhost:5000/api/notifications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setNotifications([...notifications, response.data]); // Update state with newly added notification
      setForm({ photo: null, notificationName: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error adding notification:', error);
      alert('Error adding notification. Please check the console for more details.');
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${notificationId}`);
      setNotifications(notifications.filter(notification => notification._id !== notificationId)); // Remove deleted notification from state
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleEditNotification = async (notification) => {
    // Set the editing notification
    setEditingNotification(notification);
    setForm({
      notificationName: notification.notificationName,
      description: notification.description,
      photo: null // Reset photo when editing
    });
  };

  const handleUpdateNotification = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (form.photo) {
      formData.append('photo', form.photo); // Include new photo if available
    }
    formData.append('notificationName', form.notificationName);
    formData.append('description', form.description);

    try {
      const response = await axios.put(`http://localhost:5000/api/notifications/${editingNotification._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setNotifications(notifications.map(n => (n._id === editingNotification._id ? response.data : n))); // Update notification in state
      setForm({ photo: null, notificationName: '', description: '' }); // Reset form
      setEditingNotification(null); // Clear editing state
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom align="center" color='white' sx={{ fontWeight: 'bold' }}>
          {editingNotification ? 'Edit Notification' : 'Add New Notification'}
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
          <form onSubmit={editingNotification ? handleUpdateNotification : handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <TextField
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                sx={{ marginRight: '20px', flexGrow: 1 }}
              />
              {form.photo && (
                <Box sx={{ flexShrink: 0 }}>
                  <img src={URL.createObjectURL(form.photo)} alt="Notification" style={{ width: '150px', height: 'auto', borderRadius: '4px' }} />
                </Box>
              )}
            </Box>
            <TextField
              label="Notification Name"
              name="notificationName"
              value={form.notificationName}
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
            <Button type="submit" variant="contained" color="warning">
              {editingNotification ? 'Update Notification' : 'Add Notification'}
            </Button>
          </form>
        </Box>

        <Typography variant="h5" gutterBottom align="center" color='white' sx={{ fontWeight: 'bold' }}>
          Notifications List
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {notifications.map((notification) => {
            const imageUrl = `http://localhost:5000/${notification.photo}`; // Construct the full image URL

            return (
              <Grid item xs={12} sm={6} md={4} key={notification._id}>
                <Card sx={{ maxWidth: 345, margin: 'auto', border: '1px solid #ccc' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={notification.photo ? imageUrl : defaultImage} // Use constructed URL for image
                    alt={notification.notificationName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {notification.notificationName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notification.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                      <Button variant="outlined" color="primary" onClick={() => handleEditNotification(notification)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => handleDeleteNotification(notification._id)}>
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

export default Anotifications;
