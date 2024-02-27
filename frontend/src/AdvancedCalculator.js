import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search'; // Ensure Search icon is imported
import UtilityRateStructure from './rate_structures/UtilityRateStructure';
import SystemType from './SystemType';
import YesNo from './YesNo';
import PhotovoltaicPage from './Photovoltaic';
import DieselGeneratorPage from './DieselGenerator';
import BatteryBankPage from './BatteryBank';
import TotalLoad from './TotalLoad';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Zipcode from './Zipcode';
import axios from 'axios';
import * as yup from 'yup';
import './App.css';

// Validation schema
const advancedValidationSchema = yup.object({
    zipcode: yup.string()
      .required('Zipcode is required')
      .matches(/^[0-9]{5}$/, 'Zipcode must be 5 digits'), // Adjust regex as needed
    ratestructure: yup.string()
        .required('Selecting a rate structure is required'),
    
  });

const AdvancedCalculator = () => {
    const methods = useForm(); // Initialize useForm
    const { control, watch, handleSubmit } = methods;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const isPhotovoltaic = watch('photovoltaic');
    const isDieselGenerator = watch('dieselGenerator');
    const isBatteryBank = watch('batteryBank');

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Get started by entering your zipcode.</p>
                <Zipcode />
                <br></br>
                <p>Select your utility rate structure.</p>
                <UtilityRateStructure />
                <br></br>
                <p>Input annual or monthly load data in kW.</p>
                <TotalLoad />
                <br></br>
                <p>Select the components of your system.</p>
                <SystemType />
                <br></br>
                {isPhotovoltaic && <PhotovoltaicPage />}
                {isDieselGenerator && <DieselGeneratorPage />}
                {isBatteryBank && <BatteryBankPage />}
                <p>Is your system connected to the grid?</p>
                <YesNo name="connectedToGrid" />
                <br></br>
                <p>Is your system net metered?</p>
                <YesNo name="netMetered" />
                <br></br>

                <p>What is your project's lifetime?</p>
                <Controller
                    name="n"
                    control={control}
                    defaultValue="25"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            label="Project Lifetime"
                            variant="outlined"
                            fullWidth
                            style={{ width: "210px", margin: '10px auto' }}
                        />
                    )}
                />
                <p>What is the maximum loss of power supply probability?</p>
                <Controller
                    name="LPSP_max_rate"
                    control={control}
                    defaultValue="1%"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            label="Power Supply Probability"
                            variant="outlined"
                            fullWidth
                            style={{ width: "210px", margin: '10px auto' }}
                        />
                    )}
                />
                <p>What is the minimum renewable energy considered for optimal sizing?</p>
                <Controller
                    name="RE_min_rate"
                    control={control}
                    defaultValue="0.75"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            label="Minimum Renewable Energy"
                            variant="outlined"
                            fullWidth
                            style={{ width: "210px", margin: '10px auto' }}
                        />
                    )}
                />

                <p>What is the inflation rate?</p>
                <Controller
                    name="e_ir_rate"
                    control={control}
                    defaultValue="0.02"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            label="Inflation Rate"
                            variant="outlined"
                            fullWidth
                            style={{ width: "210px", margin: '10px auto' }}
                        />
                    )}
                />
                <p>What is the nominal discount rate?</p>
                <Controller
                    name="n_ir_rate"
                    control={control}
                    defaultValue="0.055"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            label="Nominal Discount Rate"
                            variant="outlined"
                            fullWidth
                            style={{ width: "210px", margin: '10px auto' }}
                        />
                    )}
                />
                <p>What is the real discount rate?</p>
                <Controller
                    name="ir"
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            label="Real Discount Rate"
                            variant="outlined"
                            fullWidth
                            style={{ width: "210px", margin: '10px auto' }}
                        />
                    )}
                />
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
export default AdvancedCalculator;