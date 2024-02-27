import React, { useState } from 'react';
import UtilityRateStructure from './rate_structures/UtilityRateStructure';
import TotalLoad from './TotalLoad';
import Zipcode from './Zipcode';
import { LoadingButton } from '@mui/lab';
import { FormProvider, useForm } from 'react-hook-form'; // Import useForm and FormProvider from React Hook Form
import axios from 'axios';
import './App.css';
import Search from '@mui/icons-material/Search';
import * as yup from 'yup';

// Validation schema
const generalValidationSchema = yup.object({
    zipcode: yup.string()
        .required('Zipcode is required')
        .matches(/^[0-9]{5}$/, 'Zipcode must be 5 digits'),
    ratestructure: yup.string()
        .required('Selecting a rate structure is required'),
    flatRate: yup.string()
        .matches(/^\d*\.?\d+$/, 'The field must be a decimal number') // This regex matches decimal numbers
        .when('ratestructure', (ratestructure, schema) => {
            return ratestructure === 'Flat Rate'
                ? schema.required('This field is required for Flat Rate')
                : schema;
        }),
});

const GeneralCalculator = () => {
    const methods = useForm(); // Initialize useForm
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        const url = 'http://localhost:5000/submit/advanced';
        let config = {
            params: data,
            responseType: 'json'
        };

        try {
            const response = await axios.get(url, config);
            setMessage(response.data.message);
            // Process response data here as needed
            setLoading(false);
        } catch (error) {
            setMessage('Error accessing backend. Please try again later.');
            console.error('Error', error);
            setLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <form className="form">
                <p>Get started by entering your zipcode.</p>
                <Zipcode />
                <br></br>
                <p>Input annual or monthly load data in kW.</p>
                <TotalLoad />
                <br></br>
                <p>Select your utility rate structure and input values in dollars per hour (USD).</p>
                <UtilityRateStructure />
                <p style={{ fontStyle: "italic" }}>It can take up to 1 min to calculate your results.</p>
                <LoadingButton
                    onClick={onSubmit}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Search />}
                    variant="contained"
                    type="submit"
                    style={{ margin: '10px' }}
                    sx={{ backgroundColor: "#4F2683", color: "white", fontWeight: "600" }}
                >
                    Submit
                </LoadingButton>
            </form>
        </FormProvider>
    );
};
export default GeneralCalculator;
