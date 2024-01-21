import React, { useState } from 'react';
// Landing Page
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import './App.css';

const LandingPage = () => {
    return (
        <Box className="landingPage">
            <div className="landingText">
                <h1>WELCOME TO SAMA!</h1>
                <br></br>
                <p>Sama is the first-ever publicly available tool to help you calculate the cost of switching to off-grid solar photvoltaic (PV) systems.</p>
                <p>Learn how you can go green today.</p>
                <br></br>
                <Link href="#calculator" underline="none" color="inherit    ">
                <Button variant="contained" size="large" sx={{ backgroundColor:"#4F2683", color: "white", fontWeight: "600" }}>Get Started →</Button>
                </Link>
            </div>
        </Box>
    );
};
export default LandingPage;
