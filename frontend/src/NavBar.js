import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import './App.css';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1, boxShadow: 3 }} className="navBar">
        <AppBar position="static" color='default'>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: "#4F2683", fontWeight:"800"}} >
            SAMA
            </Typography>
            <Link href="#calculator" underline="none" color="inherit"><Button color="inherit" className="navButton">Calculator</Button></Link>
            <Link href="#about" underline="none" color="inherit"><Button color="inherit" className="navButton">About</Button></Link>
            <Link href="#contact" underline="none" color="inherit"><Button color="inherit" className="navButton">Contact</Button></Link>
        </Toolbar>
        </AppBar>
    </Box>
    );
};
export default NavBar;
            

            