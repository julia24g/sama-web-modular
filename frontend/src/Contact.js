import React from 'react';
import Box from '@mui/material/Box';
import './style/App.css';

const Contact = () => {
    return (
        <Box id="contact">
                <div className="contactText">
                    <h1>CONTACT</h1>
                    <br></br>
                    <h2>Dr. Joshua Pearce</h2>
                    <p>John M. Thompson Chair in Information Technology and Innovation,</p>
                    <p>Thompson Centre for Engineering Leadership & Innovation</p>
                    <p>Western University</p>
                    <p>joshua.pearce@uwo.ca</p>
                    <br></br>
                    <br></br>
                    <h2>Seyyed Ali Sadat</h2>
                    <p>Researcher, FAST Lab</p>
                    <p>Western University</p>
                    <p>ssadat6@uwo.ca</p>
                    <br></br>
                </div>
            </Box>
    );
};
export default Contact;