import React from 'react';
import { Typography, Link } from '@mui/material';

const SidePanelLinks = () => {
  // Define an array of objects containing link text and href attributes
  const links = [
    { text: 'Dashboard', href: '/' },
    { text: 'Companies', href: '/companies' },
    { text: 'Candidate', href: '/candidate' },
    { text: 'Internal Team', href: '/internal-team' }
  ];

  return (
    <div>
      <Typography variant="h6">Quick Links</Typography>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} color="inherit" style={{ textDecoration: 'none' }}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidePanelLinks;
