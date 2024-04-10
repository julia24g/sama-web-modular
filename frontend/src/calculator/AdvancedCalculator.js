import React, { useState, useEffect } from 'react';
import UtilityRateStructure from '../rate_structures/UtilityRateStructure';
import SystemType from '../system_types/SystemType';
import YesNo from '../field_components/YesNo';
import PhotovoltaicPage from '../system_types/Photovoltaic';
import DieselGeneratorPage from '../system_types/DieselGenerator';
import BatteryBankPage from '../system_types/BatteryBank';
import TotalLoad from '../TotalLoad';
import { useForm, FormProvider } from 'react-hook-form';
import Zipcode from '../Zipcode';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import StandardField from '../field_components/FieldComponent';
import { advancedValidationSchema, defaultValues } from '../validation/ValidationSchema';
import SubmitButton from '../field_components/SubmitButton';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const AdvancedCalculator = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(advancedValidationSchema),
        mode: 'onBlur'
    });
    const { watch, handleSubmit, register, unregister, trigger } = methods;
    const [loading, setLoading] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { formState: { isValid } } = methods;

    const isPhotovoltaic = watch('photovoltaic');
    const isDieselGenerator = watch('dieselGenerator');
    const isBatteryBank = watch('batteryBank');
    const n_ir_rate = watch('n_ir_rate');
    const e_ir_rate = watch('e_ir_rate');

    const photovoltaicFields = ['PVCost', 'PVReplacementCost', 'PVOandM', 'PVLifetime'];
    const dieselGeneratorFields = ['C_DG', 'R_DG', 'MO_DG', 'TL_DG'];
    const batteryBankFields = ['C_B', 'R_B', 'batteryOandM', 'batteryYearlyDegradation', 'SOC_min', 'SOC_max', 'batteryVoltage'];

    useEffect(() => {
        if (isPhotovoltaic) {
            photovoltaicFields.forEach(field => {
                register(field);
            });
        } else {
            photovoltaicFields.forEach(field => {
                unregister(field);
            });
        }
    }, [isPhotovoltaic, register, unregister]);

    useEffect(() => {
        if (isDieselGenerator) {
            dieselGeneratorFields.forEach(field => {
                register(field);
            });
        } else {
            dieselGeneratorFields.forEach(field => {
                unregister(field);
            });
        }
    }, [isDieselGenerator, register, unregister]);

    useEffect(() => {
        if (isBatteryBank) {
            batteryBankFields.forEach(field => {
                register(field);
            });
        } else {
            batteryBankFields.forEach(field => {
                unregister(field);
            });
        }
    }, [isBatteryBank, register, unregister]);

    useEffect(() => {
        var realInterestRate = ((n_ir_rate - e_ir_rate) / (1 + e_ir_rate)).toFixed(2);
        methods.setValue('ir', realInterestRate);
        trigger(defaultValues);
    }, [n_ir_rate, e_ir_rate, methods.setValue, trigger]);

    const onSubmit = async (data) => {
        setBackdropOpen(true);
        setLoading(true);
        const url = 'https://127.0.0.1:8000/submit/advanced';

        try {
            const response = await axios.post(url, data);
            setMessage(response.data.message);
            setLoading(false);
            navigate('/results', { state: { results: response.data } });
            setBackdropOpen(false);
        } catch (error) {
            setMessage('Error accessing backend. Please try again later.');
            console.error('Error', error);
            setLoading(false);
            setBackdropOpen(false);
        }
    };

    // const formData = watch();
    // useEffect(() => {
    //     console.log("Form data changed:", formData);
    // }, [formData]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Zipcode />
                <TotalLoad />
                <UtilityRateStructure />
                <p>Is your system connected to the grid?</p>
                <YesNo name="connectedToGrid" />
                <p>Is your system net metered?</p>
                <YesNo name="netMetered" />
                <p>What is your project's lifetime in years?</p>
                <StandardField name='n' label="Project Lifetime" defaultValue={25} unit='' />
                <p>What is the maximum loss of power supply probability?</p>
                <StandardField name="LPSP_max_rate" label="Max Loss of Power Supply" defaultValue={0.01} unit='%' />
                <p>What is the minimum renewable energy considered for optimal sizing?</p>
                <StandardField name="RE_min_rate" label="Minimum Renewable Energy" defaultValue={75} unit='%' />
                <p>What is the inflation rate?</p>
                <StandardField name="e_ir_rate" label="Inflation Rate" defaultValue={2} unit='%' />
                <p>What is the nominal discount rate?</p>
                <StandardField name="n_ir_rate" label="Nominal Discount Rate" defaultValue={5.5} unit='%' />
                <p>What is the real discount rate?</p>
                <StandardField name="ir" label="Real Discount Rate" defaultValue={3.4} unit='%' />
                <SystemType />
                <br></br>
                {isPhotovoltaic && <PhotovoltaicPage />}
                {isDieselGenerator && <DieselGeneratorPage />}
                {isBatteryBank && <BatteryBankPage />}
                <SubmitButton loading={loading} isValid={isValid} />
                <Backdrop sx={{ color:"primary", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen}>
                    <CircularProgress />
                    <Typography variant="body1">It can take up to 1 minute to calculate your results.</Typography>
                </Backdrop>

            </form>
        </FormProvider>
    );
};
export default AdvancedCalculator;