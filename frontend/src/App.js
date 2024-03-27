import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import Calculator from './calculator/Calculator';
import Results from './results/Results';
import About from './About';
import Contact from './Contact';
import './style/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                
                <div id="footer">
                    <h3>Western University</h3>
                    <p>1151 Richmond St.</p>
                    <p>London, Ontario, Canada</p>
                    <p>N6A 3K7</p>
                </div>
            </div>
        </Router>
    );
}

export default App;

function MainPage() {
    return (
        <>
            <LandingPage />
            <Calculator />
        </>
    );
}