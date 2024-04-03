import React, { useState } from 'react';
import UtilityRateStructure from '../rate_structures/UtilityRateStructure';
import TotalLoad from '../TotalLoad';
import Zipcode from '../Zipcode';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { baseValidationSchema } from '../validation/ValidationSchema';
import SubmitButton from '../field_components/SubmitButton';
import { useNavigate } from 'react-router-dom';

const GeneralCalculator = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(baseValidationSchema),
        mode: 'onBlur'
    });
    const { formState: { isValid } } = methods;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        const url = 'https://127.0.0.1:8000/submit/general';

        try {
            const response = await axios.post(url, data);
            setMessage(response.data.message);
            setLoading(false);
            navigate('/results', { state: { results: response.data } });
        } catch (error) {
            setMessage('Error accessing backend. Please try again later.');
            console.error(error.response.data);
            setLoading(false);
        }
    };

    const { handleSubmit } = methods;

    // const formData = watch();
    // useEffect(() => {
    //     console.log("Form data changed:", formData);
    // }, [formData]);
    
    return (
        <FormProvider {...methods}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Zipcode />
                <TotalLoad />
                <UtilityRateStructure />
                <SubmitButton loading={loading} isValid={isValid} />
            </form>
        </FormProvider>
    );
};
export default GeneralCalculator;
