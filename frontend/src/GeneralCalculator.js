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
import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver
import { createZipcodeValidation, createMonthlyLoadValidation, createRateValidation, createAnnualLoadValidation } from './ValidationUtils'; // Import validation functions from validationUtils.js

// Validation schema
const generalValidationSchema = yup.object({
    zipcode: createZipcodeValidation(),
    annualTotalLoad: createAnnualLoadValidation(),
    monthlyLoad1: createMonthlyLoadValidation(),
    monthlyLoad2: createMonthlyLoadValidation(),
    monthlyLoad3: createMonthlyLoadValidation(),
    monthlyLoad4: createMonthlyLoadValidation(),
    monthlyLoad5: createMonthlyLoadValidation(),
    monthlyLoad6: createMonthlyLoadValidation(),
    monthlyLoad7: createMonthlyLoadValidation(),
    monthlyLoad8: createMonthlyLoadValidation(),
    monthlyLoad9: createMonthlyLoadValidation(),
    monthlyLoad10: createMonthlyLoadValidation(),
    monthlyLoad11: createMonthlyLoadValidation(),
    monthlyLoad12: createMonthlyLoadValidation(),
    rateStructure: yup.string()
        .required('Selecting a rate structure is required'),
    flatRate: createRateValidation('Flat Rate'),
    seasonalRateField1: createRateValidation('Seasonal Rate'),
    seasonalRateField2: createRateValidation('Seasonal Rate'),
    monthlyRate1: createRateValidation('Monthly Rate'),
    monthlyRate2: createRateValidation('Monthly Rate'),
    monthlyRate3: createRateValidation('Monthly Rate'),
    monthlyRate4: createRateValidation('Monthly Rate'),
    monthlyRate5: createRateValidation('Monthly Rate'),
    monthlyRate6: createRateValidation('Monthly Rate'),
    monthlyRate7: createRateValidation('Monthly Rate'),
    monthlyRate8: createRateValidation('Monthly Rate'),
    monthlyRate9: createRateValidation('Monthly Rate'),
    monthlyRate10: createRateValidation('Monthly Rate'),
    monthlyRate11: createRateValidation('Monthly Rate'),
    monthlyRate12: createRateValidation('Monthly Rate'),
    lowTierPrice: createRateValidation('Tiered Rate'),
    lowTierMaxLoad: createRateValidation('Tiered Rate'),
    mediumTierPrice: createRateValidation('Tiered Rate'),
    mediumTierMaxLoad: createRateValidation('Tiered Rate'),
    highTierPrice: createRateValidation('Tiered Rate'),
    highTierMaxLoad: createRateValidation('Tiered Rate'),
    summerLowTierPrice: createRateValidation('Seasonal Tiered Rate'),
    summerLowTierMaxLoad: createRateValidation('Seasonal Tiered Rate'),
    summerMediumTierPrice: createRateValidation('Seasonal Tiered Rate'),
    summerMediumTierMaxLoad: createRateValidation('Seasonal Tiered Rate'),
    summerHighTierPrice: createRateValidation('Seasonal Tiered Rate'),
    summerHighTierMaxLoad: createRateValidation('Seasonal Tiered Rate'),
    winterLowTierPrice: createRateValidation('Seasonal Tiered Rate'),
    winterLowTierMaxLoad: createRateValidation('Seasonal Tiered Rate'),
    winterMediumTierPrice: createRateValidation('Seasonal Tiered Rate'),
    winterMediumTierMaxLoad: createRateValidation('Seasonal Tiered Rate'),
    winterHighTierPrice: createRateValidation('Seasonal Tiered Rate'),
    winterHighTierMaxLoad: createRateValidation('Seasonal Tiered Rate'),
    januaryLowPrice: createRateValidation('Monthly Tiered Rate'),
    januaryLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    januaryMediumPrice: createRateValidation('Monthly Tiered Rate'),
    januaryMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    januaryHighPrice: createRateValidation('Monthly Tiered Rate'),
    januaryHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    februaryLowPrice: createRateValidation('Monthly Tiered Rate'),
    februaryLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    februaryMediumPrice: createRateValidation('Monthly Tiered Rate'),
    februaryMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    februaryHighPrice: createRateValidation('Monthly Tiered Rate'),
    februaryHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    marchLowPrice: createRateValidation('Monthly Tiered Rate'),
    marchLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    marchMediumPrice: createRateValidation('Monthly Tiered Rate'),
    marchMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    marchHighPrice: createRateValidation('Monthly Tiered Rate'),
    marchHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    aprilLowPrice: createRateValidation('Monthly Tiered Rate'),
    aprilLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    aprilMediumPrice: createRateValidation('Monthly Tiered Rate'),
    aprilMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    aprilHighPrice: createRateValidation('Monthly Tiered Rate'),
    aprilHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    mayLowPrice: createRateValidation('Monthly Tiered Rate'),
    mayLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    mayMediumPrice: createRateValidation('Monthly Tiered Rate'),
    mayMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    mayHighPrice: createRateValidation('Monthly Tiered Rate'),
    mayHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    juneLowPrice: createRateValidation('Monthly Tiered Rate'),
    juneLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    juneMediumPrice: createRateValidation('Monthly Tiered Rate'),
    juneMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    juneHighPrice: createRateValidation('Monthly Tiered Rate'),
    juneHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    julyLowPrice: createRateValidation('Monthly Tiered Rate'),
    julyLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    julyMediumPrice: createRateValidation('Monthly Tiered Rate'),
    julyMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    julyHighPrice: createRateValidation('Monthly Tiered Rate'),
    julyHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    augustLowPrice: createRateValidation('Monthly Tiered Rate'),
    augustLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    augustMediumPrice: createRateValidation('Monthly Tiered Rate'),
    augustMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    augustHighPrice: createRateValidation('Monthly Tiered Rate'),
    augustHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    septemberLowPrice: createRateValidation('Monthly Tiered Rate'),
    septemberLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    septemberMediumPrice: createRateValidation('Monthly Tiered Rate'),
    septemberMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    septemberHighPrice: createRateValidation('Monthly Tiered Rate'),
    septemberHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    octoberLowPrice: createRateValidation('Monthly Tiered Rate'),
    octoberLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    octoberMediumPrice: createRateValidation('Monthly Tiered Rate'),
    octoberMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    octoberHighPrice: createRateValidation('Monthly Tiered Rate'),
    octoberHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    novemberLowPrice: createRateValidation('Monthly Tiered Rate'),
    novemberLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    novemberMediumPrice: createRateValidation('Monthly Tiered Rate'),
    novemberMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    novemberHighPrice: createRateValidation('Monthly Tiered Rate'),
    novemberHighMaxLoad: createRateValidation('Monthly Tiered Rate'),
    decemberLowPrice: createRateValidation('Monthly Tiered Rate'),
    decemberLowMaxLoad: createRateValidation('Monthly Tiered Rate'),
    decemberMediumPrice: createRateValidation('Monthly Tiered Rate'),
    decemberMediumMaxLoad: createRateValidation('Monthly Tiered Rate'),
    decemberHighPrice: createRateValidation('Monthly Tiered Rate'),
    decemberHighMaxLoad: createRateValidation('Monthly Tiered Rate')
});

const GeneralCalculator = () => {
    const methods = useForm({
        resolver: yupResolver(generalValidationSchema),
        mode: 'onChange'
    }); // Initialize useForm
    const { formState: { isValid } } = methods; // Correctly extract isValid
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

    const { handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p>Get started by entering your zipcode.</p>
                <Zipcode />
                <br></br>
                <p>Input annual or monthly load data in kW.</p>
                <TotalLoad />
                <br></br>
                <p>Select your utility rate structure and input values in dollars per kWh (USD).</p>
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
                    disabled={!isValid || loading}
                >
                    Submit
                </LoadingButton>
            </form>
        </FormProvider>
    );
};
export default GeneralCalculator;
