import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';




const Admin = () => {
 

  return (
    <Grid container spacing={2} sx={{ padding: 4 }}>
      {/* Main content */}
      <Grid item xs={12} md={8}>
        <Box sx={{ color: 'white', marginTop: '40px' }}>
          <Typography variant="h3">Admin Dashboard</Typography>
          <Typography variant="body1" paragraph>
            Welcome to the admin panel. Here you can manage events, notifications, feedback, and users.
          </Typography>

 
        </Box>
      </Grid>

     
    </Grid>
  );
};

export default Admin;
