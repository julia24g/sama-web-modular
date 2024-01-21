import React, { useState } from 'react';
import { TextField, accordionActionsClasses } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Nav bar
import NavBar from './NavBar';
// Landing Page
import LandingPage from './LandingPage';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

// Calculator tabs
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import axios from 'axios'

import './App.css';
import stateRegionData from './state-regions.json'
import states from './states.json'

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