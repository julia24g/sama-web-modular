import React, { useState } from 'react';
import { TextField, accordionActionsClasses } from '@mui/material';
import Typography from '@mui/material/Typography';
import './App.css';

const AdvancedCalculator = () => {

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
        <form>
            <Typography sx={{fontWeight: "700"}}>General Data</Typography>
            <TextField
                label="Type of System" 
                variant="outlined" 
                value={formData.systemType}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Zipcode" 
                variant="outlined" 
                value={formData.zipcode}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Typical Electrical Load" 
                variant="outlined" 
                value={formData.typicalElectricalLoad}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Project Lifetime" 
                variant="outlined" 
                value={formData.projectLifetime}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Maximum Loss of Power Supply Probability" 
                variant="outlined" 
                value={formData.maxPowerSupplyLoss}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Minimum Renewable Energy considered for Optimal Sizing" 
                variant="outlined" 
                value={formData.minRenewableEnergy}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Inflation Rate" 
                variant="outlined" 
                value={formData.inflationRate}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Nominal Discount Rate" 
                variant="outlined" 
                value={formData.nominalDiscountRate}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Real Discount Rate" 
                variant="outlined" 
                value={formData.realDiscountRate}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            
            <Typography sx={{fontWeight: "700"}}>PV</Typography>

            <TextField
                label="Capital Cost of PV Modules per kW" 
                variant="outlined" 
                value={formData.PVCost}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Replacement Cost of PV Modules per kW" 
                variant="outlined" 
                value={formData.PVReplacementCost}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="O&M of PV Modules per kW" 
                variant="outlined" 
                value={formData.PVOandM}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="PV Modules Lifetime" 
                variant="outlined" 
                value={formData.PVLifetime}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <TextField
                label="Efficiency of PV Module" 
                variant="outlined" 
                value={formData.PVEfficiency}
                onChange={handleCalculatorInputChange}
                style={{margin: '10px'}}
            />
            <Typography sx={{fontWeight: "700"}}>WT</Typography>
            <Typography sx={{fontWeight: "700"}}>Diesel Generator</Typography>
            <Typography sx={{fontWeight: "700"}}>Battery Bank</Typography>
            <Typography sx={{fontWeight: "700"}}>Inverter</Typography>
            <Typography sx={{fontWeight: "700"}}>Charge Controller</Typography>
            <Typography sx={{fontWeight: "700"}}>Grid</Typography>
        </form>
    );
};
export default AdvancedCalculator;