import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import Image from './SAMA_Logo-with_Typography.png';
import './styling/NavBar.css';

const NavBar = () => {
    const location = useLocation();
    return (
        <Box>
            <AppBar position="sticky" color='transparent' className='appNavBar'>
                <Toolbar>
                    <img src={Image} alt="SAMA Logo" style={{ maxHeight: '50px', marginRight: 'auto' }} />
                    {location.pathname !== '/' && (
                        <Link to="/">
                            <Button className='navButton'>Calculator</Button>
                        </Link>
                    )}
                    <a href="#about"><Button className='navButton'>About</Button></a>
                    <a href="#contact"><Button className='navButton'>Contact</Button></a>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default NavBar;
