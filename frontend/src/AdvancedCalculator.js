import React, { useState } from 'react';
import { TextField, accordionActionsClasses } from '@mui/material';
import Typography from '@mui/material/Typography';
import UtilityRateStructure from './UtilityRateStructure';
import SystemType from './SystemType';
import YesNo from './YesNo';
import PhotovoltaicPage from './PVQuestions';
import WindTurbinePage from './WindTurbine';
import DieselGeneratorPage from './DieselGenerator';
import BatteryBankPage from './BatteryBank';
import TotalLoad from './TotalLoad';
import { useForm } from './FormDataContext'; // Import the useForm hook
import './App.css';

const AdvancedCalculator = () => {
    const { formData, dispatch } = useForm(); // Use the useForm hook

    const [selectedSystems, setSelectedSystem] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    // Function for getting default values of form variables
    const handleCalculatorInputChange = (event) => {
        const { name, value } = event.target;
        dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: {
                ...formData, // Preserve existing form data
                [name]: value, // Update the field with the new value
            },
        });
    };

    const handleSystemSelection = (selected) => {
        setSelectedSystem(selected);
    };

    const handleNextStep = () => {
        if (currentStep < selectedSystems.length) {
            setCurrentStep(currentStep + 1);
        } else {
            return null;
        }
    };

    const renderCurrentSystemTypePage = () => {
        if (currentStep <= selectedSystems.length) {
            switch (selectedSystems[currentStep - 1]) {
                case 'Photovoltaic':
                    return <PhotovoltaicPage formData={formData} onNextStep={handleNextStep} />;
                case 'Wind Turbine':
                    return <WindTurbinePage formData={formData} onNextStep={handleNextStep} />;
                case 'Diesel Generator':
                    return <DieselGeneratorPage formData={formData} onNextStep={handleNextStep} />;
                case 'Battery Bank':
                    return <BatteryBankPage formData={formData} onNextStep={handleNextStep} />;
                default:
                    return null;
            }
        }
        return null;
    };

    return (
        <div>
            {currentStep === 1 ? (
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
                    <SystemType onSelectSystem={handleSystemSelection} />
                    <br></br>
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
            ) : (
                // Render the selected system type page
                renderCurrentSystemTypePage()
            )}

            {currentStep > 1 && (
                <button onClick={handleNextStep}>Next</button>
            )}
        </div>
    );
};
export default AdvancedCalculator;