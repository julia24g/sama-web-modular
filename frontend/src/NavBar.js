import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Image from './SAMA_Logo-with_Typography.png'; // Make sure the path is correct
import './style/App.css';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1, boxShadow: 3 }} className="navBar">
            <AppBar position="static" color='default'>
                <Toolbar>
                    {/* Logo at the left */}
                    <img src={Image} alt="SAMA Logo" style={{ maxHeight: '50px', marginRight: 'auto' }} /> {/* Adjust maxHeight as needed and use marginRight: 'auto' to push everything else to the right */}
                    {/* Navigation Links */}
                    <Link href="#calculator" underline="none" color="inherit"><Button color="inherit" className="navButton">Calculator</Button></Link>
                    <Link href="#about" underline="none" color="inherit"><Button color="inherit" className="navButton">About</Button></Link>
                    <Link href="#contact" underline="none" color="inherit"><Button color="inherit" className="navButton">Contact</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default NavBar;
