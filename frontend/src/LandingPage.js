import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import './styling/LandingPage.css';
import LandingPageButton from './field_components/LandingPageButton';

const LandingPage = () => {
    return (
        <Grid container className="landingPage">
            <Grid item xs={12} md={6} className="leftLandingPage">
                <Typography variant="h2" className="landingTitle" gutterBottom>
                    Welcome to SAMA
                </Typography>
                <Typography variant="body1" paragraph>
                    SAMA (Solar Alone Multi-objective Advisor) is the first-ever publicly available tool to help you determine if you should leave the grid and reduce your electric costs by installing a solar, battery, and generator system.
                </Typography>
                <Typography variant="body1" paragraph>
                    <b>Please select which calculator you would like to use.</b>
                </Typography>
                {/* <Link href="#calculator" underline="none" color="inherit">
                    <Button variant="contained" size="large" sx={{ backgroundColor: "#4F2683", color: "white", fontWeight: "600" }}>Get Started →</Button>
                </Link> */}
            </Grid>
            <Grid item container xs={12} md={6} className='rightLandingPage'>
                <LandingPageButton title="General" text="Ideal for quick grid defection estimates or for newcomers to energy systems."/>
                <LandingPageButton title="Advanced" text="Tailored for researchers seeking precision with detailed input options."/>
            </Grid>
        </Grid>
    );
};
export default LandingPage;
