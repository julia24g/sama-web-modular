import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import Calculator from './calculator/Calculator';
import Results from './results/Results';
import About from './About';
import Contact from './contact/Contact';
import Footer from './Footer';
import { CalculatorTabProvider } from './calculator/CalculatorTab';
import FAQ from './FAQ';
import CustomThemeProvider from './styling/CustomThemeProvider';

function App() {
    return (
        <CustomThemeProvider>
            <Router>
                <div className="App">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/results" element={<Results />} />
                        <Route path="/faq" element={<FAQ />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CustomThemeProvider>
    );
}

export default App;

function MainPage() {
    return (
        <CalculatorTabProvider>
            <LandingPage />
            <Calculator />
            <About />
            <Contact />
        </CalculatorTabProvider >
    );
}