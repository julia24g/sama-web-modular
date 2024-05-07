import React from 'react';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';

const Footer = () => {
    return (
        <footer>
            <Typography variant="body1">
                <SchoolIcon variant="small" />
                University of Western Ontario
            </Typography>
            <a href="https://www.appropedia.org/Category:FAST" target="_blank" rel="noopener noreferrer">
                <Typography variant="body1">
                    <GroupIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                    Free Appropriate Sustainable Technology (FAST)
                </Typography>
            </a>
            <Typography variant="body1">
                <PlaceIcon variant="small" />
                1151 Richmond Street, London, Ontario, Canada
            </Typography>
        </footer>
    );
}
export default Footer;