import React, { useState } from 'react';
import UtilityRateStructure from '../rate_structures/UtilityRateStructure';
import TotalLoad from '../TotalLoad';
import Zipcode from '../Zipcode';
import { FormProvider, useForm } from 'react-hook-form'; // Import useForm and FormProvider from React Hook Form
import axios from 'axios';
import '../style/App.css';
import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver
import { baseValidationSchema } from '../validation/ValidationSchema';
import SubmitButton from '../field_components/SubmitButton';

const GeneralCalculator = () => {
    const methods = useForm({
        resolver: yupResolver(baseValidationSchema),
        mode: 'onChange'
    });
    const { formState: { isValid } } = methods;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    const onSubmit = async (data) => {
        setLoading(true);
        const url = 'http://127.0.0.1:5000/submit/general';

        try {
            const response = await axios.post(url, data);
            setMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            setMessage('Error accessing backend. Please try again later.');
            console.error(error.response.data);
            setLoading(false);
        }

        window.location.href = "/results";
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
            
                <SubmitButton onSubmit={onSubmit} loading={loading} isValid={isValid} />
            </form>
        </FormProvider>
    );
};
export default GeneralCalculator;
