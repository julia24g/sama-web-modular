import React from 'react';
import { TextField } from '@mui/material';
import UtilityRateStructure from './UtilityRateStructure';
import TotalLoad from './TotalLoad';
import Zipcode from './Zipcode';
import { useForm } from './FormDataContext'; // Import the useForm hook

import './App.css';

const GeneralCalculator = () => {
    const { formData, dispatch } = useForm(); // Use the useForm hook

    return (
        <form className="form">
            <p>Get started by entering your zipcode.</p>
            <Zipcode />
            <br></br>
            <p>Input annual or monthly load data in kW.</p>
            <TotalLoad />
            <br></br>
            <p>Select your utility rate structure.</p>
            <UtilityRateStructure />
        </form>
    );
};
export default GeneralCalculator;
