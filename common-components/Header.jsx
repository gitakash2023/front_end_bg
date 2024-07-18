"use client"
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Logo from './header-components/Logo';
import Account from '../common-components/Account';

const Header = () => {
  const [userEmail] = useState('mediatechtemple@gmail.com');
  const userInitial = userEmail.substring(0, 1);

  return (
    <AppBar position="static" style={{ backgroundColor: '#f5f5f5' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'blue',fontSize:"1 rem" }}>
          Home
        </Typography>
        <Account initials={userInitial} email={userEmail} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
