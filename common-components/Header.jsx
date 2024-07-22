"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, ListItemIcon, Snackbar, Alert } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import Logo from './header-components/Logo';
import { _create } from "../utils/apiUtils"

const Header = () => {
  const [userEmail] = useState('mediatechtemple@gmail.com');
  const userInitial = userEmail.substring(0, 1);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const router = useRouter(); // Initialize useRouter

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await _create('/users/logout', {}); // Assuming the logout endpoint is /logout and it expects a POST request with no data

      if (response) {
        // Show success snackbar
        setSnackbarMessage('Logout successful');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        // Redirect to the login page
        router.push('/auth/login');
      } else {
        // Show error snackbar
        setSnackbarMessage('Logout failed');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      // Show error snackbar
      setSnackbarMessage('An error occurred during logout');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('An error occurred:', error);
    }
    handleClose();
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#f5f5f5' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'blue', fontSize: '1rem' }}>
          Home
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem disabled>{userEmail}</MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;
