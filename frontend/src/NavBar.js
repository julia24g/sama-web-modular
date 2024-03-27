import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import Image from './SAMA_Logo-with_Typography.png';
import './style/App.css';

const NavBar = () => {
    const location = useLocation();
    return (
        <Box sx={{ flexGrow: 1, boxShadow: 3 }} className="navBar">
            <AppBar position="static" color='default'>
                <Toolbar>
                    <img src={Image} alt="SAMA Logo" style={{ maxHeight: '50px', marginRight: 'auto' }} />
                    {location.pathname !== '/' && ( 
                        <Link to="/"> 
                            <Button color="inherit" className="navButton">Calculator</Button>
                        </Link>
                    )}
                    <Link to="/about" ><Button color="inherit" className="navButton">About</Button></Link>
                    <Link to="/contact"><Button color="inherit" className="navButton">Contact</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default NavBar;
