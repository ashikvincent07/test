import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Alayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true); // State to track authorization

  // Example: Simulate fetching user permissions (replace with real logic)
  useEffect(() => {
    const fetchUserPermissions = async () => {
      const userRole = 'admin'; // This should come from your authentication logic

      // Check if the user role allows access to the profile page
      if (location.pathname === '/admin/profile' && userRole !== 'admin') {
        setIsAuthorized(false);
      }
    };

    fetchUserPermissions();
  }, [location.pathname]);

  const showNavbar = [
    '/admin',
    '/admin/events',
    '/admin/notifications',
    '/admin/feedback',
    '/admin/users',
    '/admin/profile',
  ].includes(location.pathname);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    navigate('/'); // Perform logout and navigate to the home page
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const menuItems = (
    <List>
      <ListItem button component={Link} to="/admin" onClick={toggleDrawer(false)}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/admin/events" onClick={toggleDrawer(false)}>
        <ListItemText primary="Events" />
      </ListItem>
      <ListItem button component={Link} to="/admin/notifications" onClick={toggleDrawer(false)}>
        <ListItemText primary="Notifications" />
      </ListItem>
      <ListItem button component={Link} to="/admin/feedback" onClick={toggleDrawer(false)}>
        <ListItemText primary="Feedback" />
      </ListItem>
      <ListItem button component={Link} to="/admin/users" onClick={toggleDrawer(false)}>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem button component={Link} to="/admin/profile" onClick={toggleDrawer(false)}>
        <ListItemText primary="Profile" />
      </ListItem>
    </List>
  );

  return (
    <div style={{ boxSizing: 'border-box' }}>
      {showNavbar && (
        <>
          <AppBar
            position="fixed" // Set to fixed for top alignment
            style={{
              backgroundColor: '#f57c00',
              padding: '10px',
              boxShadow: 'none',
              // margin: '10px', // Remove this margin to align it to the top
            }}
          >
            <Toolbar
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  textAlign: { xs: 'center', sm: 'left' },
                  flexGrow: { xs: 1, sm: 0 },
                }}
              >
                Nirmala Sync Admin
              </Typography>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  justifyContent: 'space-around',
                  width: '100%',
                  maxWidth: '600px',
                  flexGrow: 1,
                }}
              >
                <Button component={Link} to="/admin" color="inherit" style={{ margin: '5px' }}>
                  Home
                </Button>
                <Button component={Link} to="/admin/events" color="inherit" style={{ margin: '5px' }}>
                  Events
                </Button>
                <Button component={Link} to="/admin/notifications" color="inherit" style={{ margin: '5px' }}>
                  Notifications
                </Button>
                <Button component={Link} to="/admin/feedback" color="inherit" style={{ margin: '5px' }}>
                  Feedback
                </Button>
                <Button component={Link} to="/admin/users" color="inherit" style={{ margin: '5px' }}>
                  Users
                </Button>
                <Button component={Link} to="/admin/profile" color="inherit" style={{ margin: '5px' }}>
                  Profile
                </Button>
              </Box>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            {menuItems}
          </Drawer>
        </>
      )}
      <main style={{ padding: '20px', paddingTop: showNavbar ? '80px' : '20px' }}> {/* Added top padding */}
        {isAuthorized ? (
          children
        ) : (
          <div style={{ color: 'red', textAlign: 'center' }}>
            <h2>Access Denied: You do not have permission to view this profile.</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Alayout;
