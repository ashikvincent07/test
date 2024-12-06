import React, { useState } from 'react';
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

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Only render AppBar for specific routes
  const showNavbar = [
    '/home',
    '/home/events',
    '/home/notifications',
    '/home/feedback',
    '/home/profile',
  ].includes(location.pathname);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    // Perform logout actions like clearing tokens, etc.
    navigate('/'); // Redirect to the login or home page after logout
  };

  const menuItems = (
    <List>
      <ListItem button component={Link} to="/home" onClick={toggleDrawer(false)}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/home/events" onClick={toggleDrawer(false)}>
        <ListItemText primary="Events" />
      </ListItem>
      <ListItem button component={Link} to="/home/notifications" onClick={toggleDrawer(false)}>
        <ListItemText primary="Notifications" />
      </ListItem>
      <ListItem button component={Link} to="/home/meet" onClick={toggleDrawer(false)}>
        <ListItemText primary="meet" />
      </ListItem>
      <ListItem button component={Link} to="/home/feedback" onClick={toggleDrawer(false)}>
        <ListItemText primary="Feedback" />
      </ListItem>
      <ListItem button component={Link} to="/home/profile" onClick={toggleDrawer(false)}>
        <ListItemText primary="Profile" />
      </ListItem>

    </List>
  );

  return (
    <div style={{ boxSizing: 'border-box' }}>
      {showNavbar && (
        <>
          <AppBar
            position="fixed"
            style={{
              backgroundColor: ' rgb(30, 30, 80)',
              padding: '10px',
              boxShadow: 'none',
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
                  fontFamily: '',
                  textAlign: { xs: 'center', sm: 'left' },
                  flexGrow: { xs: 1, sm: 0 },
                }}
              >
                Nirmala Sync
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
                <Button component={Link} to="/home" color="inherit" style={{ margin: '5px' }}>
                  Home
                </Button>
                <Button component={Link} to="/home/events" color="inherit" style={{ margin: '5px' }}>
                  Events
                </Button>
                <Button component={Link} to="/home/notifications" color="inherit" style={{ margin: '5px' }}>
                  Notifications
                </Button>
                <Button component={Link} to="" color="inherit" style={{ margin: '5px' }}>
                  Join Meet
                </Button>
                <Button component={Link} to="/home/feedback" color="inherit" style={{ margin: '5px' }}>
                  Feedback
                </Button>
                <Button component={Link} to="/home/profile" color="inherit" style={{ margin: '5px' }}>
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
      <main style={{ padding: '20px', paddingTop: showNavbar ? '80px' : '20px' }}>
        {children}
      </main>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Layout;
