import React from 'react';
import { TextField } from '@mui/material';
import UtilityRateStructure from './rate_structures/UtilityRateStructure';
import SystemType from './SystemType';
import YesNo from './YesNo';
import PhotovoltaicPage from './Photovoltaic';
import DieselGeneratorPage from './DieselGenerator';
import BatteryBankPage from './BatteryBank';
import TotalLoad from './TotalLoad';
import { Controller, useFormContext } from 'react-hook-form'; import './App.css';
import Zipcode from './Zipcode';

const AdvancedCalculator = () => {
    const { control, watch } = useFormContext(); // Use useFormContext to access the form control

    const isPhotovoltaic = watch('photovoltaic');
    const isDieselGenerator = watch('dieselGenerator');
    const isBatteryBank = watch('batteryBank');


    return (
        <div>
            <div>
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
                <YesNo name="netMetered"/>
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
                
            </div>
        </div>
    );
};
export default AdvancedCalculator;