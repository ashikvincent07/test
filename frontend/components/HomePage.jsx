import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const HomePage = () => {


  
  return (
    <div >
 
      <Box sx={{ padding: '20px',marginTop:'65px' }}>
        <Typography variant="h4" gutterBottom color="white" fontWeight="bold">
          Welcome to Nirmala Sync
        </Typography>
        <Typography variant="body1" color="white" fontWeight="bold">
          Navigate through the sections using the menu above. Manage your campus activities efficiently with Nirmala Sync.
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;
