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
                <Typography color="primary" variant="h2">
                    Welcome to SAMA
                </Typography>
                <Typography variant="h6" paragraph>
                    SAMA (Solar Alone Multi-objective Advisor) is the first-ever publicly available tool for determining the viability of transitioning off-grid. The open source program determines if going off-grid with a combination of solar, batteries and a generator is right for you.
                </Typography>
                <Typography color="primary" variant="h6" paragraph>
                    <b>Please select which calculator you would like to use.</b>
                </Typography>
                {/* <Link href="#about" underline="none" color="inherit">
                    <Button variant="outlined">About SAMA</Button>
                </Link> */}
            </Grid>
            <Grid item container xs={12} md={6} className='rightLandingPage'>
                <LandingPageButton title="General" text="Ideal for quick grid defection estimates or for newcomers to energy systems." />
                <LandingPageButton title="Advanced" text="Tailored for researchers seeking precision with detailed input options." />
            </Grid>
        </Grid>
    );
};
export default LandingPage;
