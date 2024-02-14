import React from 'react';
import { TextField } from '@mui/material';
import './App.css';
import { useForm } from './FormDataContext'; // Import the useForm hook


const BatteryBank = () => {
    const { formData, dispatch } = useForm(); // Use the useForm hook

    const handleAnswerChange = (event) => {
        const { name, value } = event.target;
        dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: {
                ...formData,
                [name]: value,
            },
        });
    };

    return (
        <form className="form">
            <p>What is the capital cost of the battery bank per kW installed (USD)?</p>
            <TextField
                required
                label="Capital Cost of Battery"
                variant="outlined"
                value={formData.C_B}
                onChange={handleAnswerChange}
                style={{ width: "210px", margin: '10px auto' }}
            />
            <p>What is the replacement cost of the battery bank per kW (USD)?</p>
            <TextField
                required
                label="Replacement Cost of Battery"
                variant="outlined"
                value={formData.R_B}
                onChange={handleAnswerChange}
                style={{ width: "250px", margin: '10px auto' }}
            />
            <p>What is the operations and maintenance cost of the battery bank per kW per year?</p>
            <TextField
                required
                label="O&M Cost of Battery"
                variant="outlined"
                value={formData.batteryOandM}
                onChange={handleAnswerChange}
                style={{ width: "210px", margin: '10px auto' }}
            />
            <p>What is the lifetime of the battery bank (years)?</p>
            <TextField
                required
                label="Battery Lifetime"
                variant="outlined"
                value={formData.L_B}
                onChange={handleAnswerChange}
                style={{ width: "210px", margin: '10px auto' }}
            />
            <p>What is the battery bank's yearly degradation?</p>
            <TextField
                required
                label="Battery Degradation"
                variant="outlined"
                value={formData.batteryYearlyDegradation}
                onChange={handleAnswerChange}
                style={{ width: "210px", margin: '10px auto' }}
            />
            <p>What is the battery bank's minimum state of charge (SOC)?</p>
            <TextField
                required
                label="Minimum SOC"
                variant="outlined"
                value={formData.SOC_min}
                onChange={handleAnswerChange}
                style={{ width: "210px", margin: '10px auto' }}
            />
            <p>What is the battery bank's maximum state of charge (SOC)?</p>
            <TextField
                required
                label="Maximum SOC"
                variant="outlined"
                value={formData.SOC_max}
                onChange={handleAnswerChange}
                style={{ width: "210px", margin: '10px auto' }}
            />
            <p>What is the battery bank's voltage?</p>
            <TextField
                required
                label="Battery Voltage"
                variant="outlined"
                value={formData.batteryVoltage}
                onChange={handleAnswerChange}
                style={{ width: "210px", margin: '10px auto' }}
            />
        </form>
    );
};

export default BatteryBank;
