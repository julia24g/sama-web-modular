import React, { useState, useEffect } from 'react';
import UtilityRateStructure from '../rate_structures/UtilityRateStructure';
import SystemType from '../system_types/SystemType';
import SelectOne from '../field_components/SelectOne';
import PhotovoltaicPage from '../system_types/Photovoltaic';
import DieselGeneratorPage from '../system_types/DieselGenerator';
import BatteryBankPage from '../system_types/BatteryBank';
import TotalLoad from '../TotalLoad';
import { useForm, FormProvider } from 'react-hook-form';
import Zipcode from '../Zipcode';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import StandardField from '../field_components/FieldComponent';
import { advancedWithSystemValidation, defaultValues } from '../validation/ValidationSchema';
import SubmitButton from '../field_components/SubmitButton';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const AdvancedCalculator = () => {
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(advancedWithSystemValidation),
        mode: 'onBlur',
        defaultValues: {
            foundLoad: true
        }
    });
    const { watch, handleSubmit, register, unregister, trigger } = methods;
    const [loading, setLoading] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { formState: { isValid } } = methods;

    var isPhotovoltaic = watch('photovoltaic');
    var isDieselGenerator = watch('dieselGenerator');
    var isBatteryBank = watch('batteryBank');
    var isGridConnected = watch('connectedToGrid')
    var n_ir_rate = watch('n_ir_rate');
    var e_ir_rate = watch('e_ir_rate');
    // var watchedFoundLoad = watch('foundLoad');

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

    const formData = watch();
    useEffect(() => {
        console.log("Form data changed:", formData);
        console.log("isGridConnected", isGridConnected);
    }, [formData]);

    const onSubmit = async (data) => {
        setBackdropOpen(true);
        setLoading(true);
        const url = `${apiBaseUrl}/submit/advanced`;

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

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p><i>Default values are provided for some questions, but please review and adjust as necessary for more accurate results.</i></p>
                <Zipcode />
                {/* {!watchedFoundLoad && <TotalLoad />} */}
                <TotalLoad />
                <UtilityRateStructure />
                <p>Is your system connected to the grid?</p>
                <SelectOne name="connectedToGrid" label1="Yes" label2="No" />
                {isGridConnected === "true" && (
                    <>
                        <p>Is your system net metered?</p>
                        <SelectOne name="netMetered" label1="Yes" label2="No" />
                    </>
                )}
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
                <p>What is the federal incentives rate?</p>
                <StandardField name="re_incentives_rate" label="Federal Incentives Rate" defaultValue={30} unit='%' />
                <SystemType />
                <br></br>
                {isPhotovoltaic && <PhotovoltaicPage />}
                {isDieselGenerator && <DieselGeneratorPage />}
                {isBatteryBank && <BatteryBankPage />}
                <SubmitButton loading={loading} isValid={isValid} />
                <Backdrop sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen}>
                    <CircularProgress />
                    <Typography variant="body1">It can take up to 1 minute to calculate your results.</Typography>
                </Backdrop>

            </form>
        </FormProvider>
    );
};
export default AdvancedCalculator;