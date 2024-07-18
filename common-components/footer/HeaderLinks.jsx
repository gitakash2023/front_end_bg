import React from 'react';
import { Box, Typography, IconButton, Zoom } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const HeaderLinks = () => {
  // Define an array of objects containing social media platform names, URLs, and icons
  const socialMediaLinks = [
    { platform: 'Facebook', url: '#', icon: <Facebook style={{ color: 'white' }} /> },
    { platform: 'Twitter', url: '#', icon: <Twitter style={{ color: 'white' }} /> },
    { platform: 'Instagram', url: '#', icon: <Instagram style={{ color: 'white' }} /> }
  ];

  return (
    <div>
      <Typography variant="h6" color="white">Follow Us</Typography>
      <Box display="flex">
        {socialMediaLinks.map((link, index) => (
          <Zoom in={true} style={{ transitionDelay: `${100 * (index + 1)}ms` }} key={index}>
            <IconButton href={link.url} aria-label={link.platform} style={{ marginRight: '10px' }}>
              {link.icon}
            </IconButton>
          </Zoom>
        ))}
      </Box>
    </div>
  );
};

export default HeaderLinks;
