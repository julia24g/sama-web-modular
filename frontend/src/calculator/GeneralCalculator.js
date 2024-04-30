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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const GeneralCalculator = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(baseValidationSchema),
        mode: 'onBlur',
        defaultValues: {
            foundLoad: true
        }
    });
    const { watch, formState: { isValid } } = methods;
    const [loading, setLoading] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        console.log(data);
        setBackdropOpen(true);
        setLoading(true);
        const url = 'https://sama.eng.uwo.ca/api/submit/general';
        // const url = 'http://127.0.0.1:5000/submit/general' // comment out during deployment

        try {
            const response = await axios.post(url, data);
            setMessage(response.data.message);
            setLoading(false);
            navigate('/results', { state: { results: response.data } });
            setBackdropOpen(false);
        } catch (error) {
            setMessage('Error accessing backend. Please try again later.');
            console.error(error.response.data);
            setLoading(false);
            setBackdropOpen(false);
        }
    };

    const { handleSubmit } = methods;
    const watchedFoundLoad = watch("foundLoad");
    
    return (
        <FormProvider {...methods}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Zipcode />
                {/* {!watchedFoundLoad && <TotalLoad />} */}
                <TotalLoad />
                <UtilityRateStructure />
                <SubmitButton loading={loading} isValid={isValid} />
                <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen}>
                    <CircularProgress />
                    <Typography variant="body1">It can take up to 1 minute to calculate your results.</Typography>
                </Backdrop>
            </form>
        </FormProvider>
    );
};
export default GeneralCalculator;
