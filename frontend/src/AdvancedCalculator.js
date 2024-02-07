import React, { useState } from 'react';
import { TextField, accordionActionsClasses } from '@mui/material';
import Typography from '@mui/material/Typography';
import UtilityRateStructure from './UtilityRateStructure';
import SystemType from './SystemType';
import YesNo from './YesNo';
import PhotovoltaicPage from './Photovoltaic';
import WindTurbinePage from './WindTurbine';
import DieselGeneratorPage from './DieselGenerator';
import BatteryBankPage from './BatteryBank';
import TotalLoad from './TotalLoad';
import { useForm } from './FormDataContext'; // Import the useForm hook
import './App.css';

const AdvancedCalculator = () => {
    const { formData, dispatch } = useForm();

    const handleCalculatorInputChange = (name, value) => {
        dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: {
                ...formData,
                [name]: value,
            },
        });
    };

    // Mapping system keys to their respective component pages
    const systemPages = {
        photovoltaic: PhotovoltaicPage,
        windTurbine: WindTurbinePage,
        dieselGenerator: DieselGeneratorPage,
        batteryBank: BatteryBankPage,
    };

    // Extracting system keys from formData where the value is true (indicating selection)
    const selectedSystemKeys = Object.keys(formData).filter(key => formData[key] === true && key in systemPages);


    return (
        <div>
            <div>
                <p>Get started by entering your zipcode.</p>
                <TextField
                    required
                    label="Zipcode"
                    variant="outlined"
                    value={formData.zipcode}
                    onChange={handleCalculatorInputChange}
                    style={{ width: "210px", margin: '10px auto' }}
                />
                <br></br>
                <p>Select your utility rate structure.</p>
                <UtilityRateStructure />
                <br></br>
                <p>Input annual or monthly load data in kWh.</p>
                <TotalLoad />
                <br></br>
                <p>Select the components of your system.</p>
                <SystemType />
                <br></br>
                {formData.photovoltaic && <PhotovoltaicPage />}
                {formData.windTurbine && <WindTurbinePage />}
                {formData.dieselGenerator && <DieselGeneratorPage />}
                {formData.batteryBank && <BatteryBankPage />}
                <p>Is your system connected to the grid?</p>
                <YesNo />
                <br></br>
                <p>Is your system net metered?</p>
                <YesNo />
                <br></br>

                <p>What is your project's lifetime?</p>
                <TextField
                    required
                    label="Project Lifetime"
                    variant="outlined"
                    value={formData.projectLifetime}
                    onChange={handleCalculatorInputChange}
                    style={{ width: "210px", margin: '10px auto' }}
                />

                <p>What is the maximum loss of power supply probability?</p>
                <TextField
                    required
                    label="Power Supply Probability"
                    variant="outlined"
                    value={formData.maxPowerSupplyLoss}
                    onChange={handleCalculatorInputChange}
                    style={{ width: "210px", margin: '10px auto' }}
                />

                <p>What is the minimum renewable energy considered for optimal sizing?</p>
                <TextField
                    required
                    label="Minimum Renewable Energy"
                    variant="outlined"
                    value={formData.minRenewableEnergy}
                    onChange={handleCalculatorInputChange}
                    style={{ width: "210px", margin: '10px auto' }}
                />

                <p>What is the inflation rate?</p>
                <TextField
                    required
                    label="Inflation Rate"
                    variant="outlined"
                    value={formData.inflationRate}
                    onChange={handleCalculatorInputChange}
                    style={{ width: "210px", margin: '10px auto' }}
                />

                <p>What is the nominal discount rate?</p>
                <TextField
                    required
                    label="Nominal Discount Rate"
                    variant="outlined"
                    value={formData.nominalDiscountRate}
                    onChange={handleCalculatorInputChange}
                    style={{ width: "210px", margin: '10px auto' }}
                />

                <p>What is the real discount rate?</p>
                <TextField
                    required
                    label="Real Discount Rate"
                    variant="outlined"
                    value={formData.realDiscountRate}
                    onChange={handleCalculatorInputChange}
                    style={{ width: "210px", margin: '10px auto' }}
                />
            </div>
        </div>
    );
};
export default AdvancedCalculator;