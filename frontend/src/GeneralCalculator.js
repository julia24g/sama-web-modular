import React, { useState } from 'react';
import { TextField } from '@mui/material';
import UtilityRateStructure from './UtilityRateStructure';
import TotalLoad from './TotalLoad';
import './App.css';

const GeneralCalculator = () => {

const [formData, setFormData] = useState({
// General Data
zipcode: ' ', 
systemType: ' ',
typicalElectricalLoad: ' ',
projectLifetime: '25',
maxPowerSupplyLoss: '0.01%',
minRenewableEnergy: '0.3',
inflationRate: ' ',
nominalDiscountRate: ' ',
realDiscountRate: ' ',
systemCapacity: '1269',
// PV
PVCost: '896',
PVReplacementCost: ' ',
PVOandM: '0',
fuelCostPerLiter: ' ',
PVLifetime: '25',
PVEfficiency: ' ',
// WT
WTCost: '',
WTReplacementCost: '',
WTOandM: '',
WTLifetime: '',
WTHubHeight: '17',
WTAnemometerHeight: '43.6',
WTElectricalEfficiency: '1',
cutInSpeed: '2.5',
cutOutSpeed: '25',
ratedSpeed: '9.5',
frictionCoefficient: '0.14',
// Diesel Generator
dieselGeneratorCost: '352',
dieselGeneratorReplacementCost: '',
dieselGeneratorOandM: '',
dieselGeneratorLifetime: '',
// Battery Bank
batteryCost: '360',
batteryChargerCost: '150',
batteryReplacementConst: '',
batteryOandM: '',
batteryLifetime: '',
batteryYearlyDegradation: '',
minSOC: '0.2',
maxSOC: '1',
batteryVoltage: '',
// Inverter
inverterCost: '',
inverterReplacementCost: '',
inverterOandM: '',
inverterLifetime: '25',
inverterEfficiency: '',
// Charge Controller
chargeControllerCost: '',
chargeControllerReplacementCost: '',
chargeControllerOandM: '',
superchargerLifetime: '',
// Grid
});

// Function for getting default values of form variables
const handleCalculatorInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
};

return (
    <form className="form">
    <p>Get started by entering your zipcode.</p>
    <TextField
        required
        label="Zipcode" 
        variant="outlined" 
        value={formData.zipcode}
        onChange={handleCalculatorInputChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <br></br>
    <p>Select your utility rate structure.</p>
    <UtilityRateStructure />
    </form>
);
};
export default GeneralCalculator;
