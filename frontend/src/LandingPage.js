import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import './style/App.css';

const LandingPage = () => {
    return (
        <Box className="landingPage">
            <div className="landingText">
                <h1>WELCOME TO SAMA!</h1>
                <br></br>
                <p>SAMA () is the first-ever publicly available tool to help you determine if you should leave the grid and reduce your electric costs by installing a solar, battery and generator system.</p>
                <br></br>
                <Link href="#calculator" underline="none" color="inherit    ">
                <Button variant="contained" size="large" sx={{ backgroundColor:"#4F2683", color: "white", fontWeight: "600" }}>Get Started →</Button>
                </Link>
            </div>
        </Box>
    );
};
export default LandingPage;
