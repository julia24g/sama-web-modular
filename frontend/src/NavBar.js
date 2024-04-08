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
                    <Link to="/about" ><Button className='navButton'>About</Button></Link>
                    <Link to="/contact"><Button className='navButton'>Contact</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default NavBar;
