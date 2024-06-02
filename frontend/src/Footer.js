import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Stack from '@mui/material/Stack';
import './styling/Footer.css';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
    return (
        <footer>
            <Box>
                <Container maxWidth="lg">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box component="img" src="logo.png" alt="Logo" sx={{ width: 100 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack className='footer_text' direction="row" alignItems="center" gap={1}>
                                <SchoolIcon variant="small" />
                                <Typography variant="body2">
                                    Western University
                                </Typography>
                            </Stack>
                            <Stack className='footer_text' direction="row" alignItems="center" gap={1}>
                                <LocationOnIcon variant="small" />
                                <Typography variant="body2">
                                    1151 Richmond Street, London, Ontario, Canada
                                </Typography>
                            </Stack>
                            <Stack className='footer_text' direction="row" alignItems="center" gap={1}>
                                <GroupIcon variant="small" />
                                <Link variant='body2' href="https://www.appropedia.org/Category:FAST" target="_blank" rel="noopener" color="inherit" underline="none">
                                    Free Appropriate Sustainable Technology (FAST)
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    );
}
export default Footer;