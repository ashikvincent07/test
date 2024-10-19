import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      {/* Main content */}
      <main style={{ padding: '20px', color: 'white',marginTop:'40px' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin panel. Here you can manage events, notifications, feedback, and users.</p>
        {/* Additional admin content */}
      </main>
    </div>
  );
};

export default Admin;
