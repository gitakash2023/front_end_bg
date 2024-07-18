"use client"
import React from 'react';
import { Grid } from '@mui/material';
import Logo from "../header-components/Logo"
import  SidePanelLinks from "./SidePanelLinks"
import HeaderLinks from "./HeaderLinks"

const Footer = () => (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0 20px 20px' }}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Logo/>
            </Grid>
            <Grid item xs={12} md={4}>
                <SidePanelLinks />
            </Grid>
            <Grid item xs={12} md={4}>
                <HeaderLinks />
            </Grid>
        </Grid>
    </footer>
);

export default Footer;
