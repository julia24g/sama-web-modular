import React from 'react';
import UtilityRateStructure from './rate_structures/UtilityRateStructure';
import TotalLoad from './TotalLoad';
import Zipcode from './Zipcode';
import './App.css';

const GeneralCalculator = () => {
    return (
        <form className="form">
            <p>Get started by entering your zipcode.</p>
            <Zipcode />
            <br></br>
            <p>Input annual or monthly load data in kW.</p>
            <TotalLoad />
            <br></br>
            <p>Select your utility rate structure and input values in dollars per hour (USD).</p>
            <UtilityRateStructure />
        </form>
    );
};
export default GeneralCalculator;
