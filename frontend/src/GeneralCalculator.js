import React from 'react';
import { TextField } from '@mui/material';
import UtilityRateStructure from './UtilityRateStructure';
import TotalLoad from './TotalLoad';
import { useForm } from './FormDataContext'; // Import the useForm hook

import './App.css';

const GeneralCalculator = () => {
    const { formData, dispatch } = useForm(); // Use the useForm hook

    // Function for getting default values of form variables
    const handleCalculatorInputChange = (event) => {
        const { name, value } = event.target;
        dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: {
                ...formData, // Preserve existing form data
                [name]: value, // Update the field with the new value
            },
        });
    };

    return (
        <form className="form">
            <p>Get started by entering your zipcode.</p>
            <TextField
                required
                label="Zipcode"
                variant="outlined"
                value={formData.zipcode}
                onChange={handleCalculatorInputChange}
                style={{ width: "210px", margin: '10px auto' }}
            />
            <br></br>
            <p>Input annual or monthly load data in kWh.</p>
            <TotalLoad />
            <br></br>
            <p>Select your utility rate structure.</p>
            <UtilityRateStructure />
        </form>
    );
};
export default GeneralCalculator;
