import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import './styling/LandingPage.css';

const LandingPage = () => {
    return (
        <Grid container spacing={4} className="landingPage">
            <Grid item xs={12} md={6} className="leftLandingPage">
                <Typography variant="h2" classname="landingTitle" gutterBottom>
                    Welcome to SAMA
                </Typography>
                <Typography variant="body1" paragraph>
                    SAMA (Solar Alone Multi-objective Advisor) is the first-ever publicly available tool to help you determine if you should leave the grid and reduce your electric costs by installing a solar, battery, and generator system.
                </Typography>
                <Link href="#calculator" underline="none" color="inherit">
                    <Button variant="contained" size="large" sx={{ backgroundColor: "#4F2683", color: "white", fontWeight: "600" }}>Get Started →</Button>
                </Link>
            </Grid>

            {/* <Grid item container xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                    <Box p={2} boxShadow={3} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            General Calculator
                        </Typography>
                        <Button variant="contained" color="primary">
                            Use General
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box p={2} boxShadow={3} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Advanced Calculator
                        </Typography>
                        <Button variant="contained" color="secondary">
                            Use Advanced
                        </Button>
                    </Box>
                </Grid>
            </Grid> */}
        </Grid>
    );
};
export default LandingPage;
