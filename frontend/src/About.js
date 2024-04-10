import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const About = () => {
    return (
        <Box id="about">
            <div className="aboutText">
                <Typography variant="h5" gutterBottom>
                    About us
                </Typography>
                <Typography variant="h2" classname="landingTitle" gutterBottom>
                    We're on a mission to make solar energy more accessible
                </Typography>
                <br></br>
                <p>SAMA is the world's first-ever publicly available web tool to help homeowners calculate the cost of building and maintaining an off-grid solar PV system.</p>
                <br></br>
                <p>Our goal is to make information about solar PV systems more accessible to the general public.
                    By providing a simple tool to assist homeowners with understanding the associated costs of generating their own electrical power,
                    we aim to encourage more people to switch to greener energy alternatives.</p>
                <br></br>
                <p>SAMA was developed by Seyyed Ali Sadat and Julia Groza, members of the Free Appropriate Sustainability Technology
                    (FAST) research group at Western University in London, ON, Canada led by Dr. Joshua Pearce.</p>
            </div>
        </Box>
    );
}
export default About;
