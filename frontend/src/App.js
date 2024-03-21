import React, { useState } from 'react';
// Import all pages
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import Calculator from './calculator/Calculator';
import Results from './results/Results';
import About from './About';
import Contact from './Contact';
import './style/App.css';
import ThemeCustomization from './style/themes';

function App() {

    return (
        <div className="App">
            <NavBar />
            <LandingPage />
            <Calculator />
            <ThemeCustomization>
                <Results />
            </ThemeCustomization>
            <About />
            <Contact />

            <div id="footer">
                <h3>Western University</h3>
                <p>1151 Richmond St.</p>
                <p>London, Ontario, Canada</p>
                <p>N6A 3K7</p>
            </div>
        </div>
    );
}

export default App;