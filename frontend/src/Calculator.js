import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';

import GeneralCalculator from './GeneralCalculator';
import AdvancedCalculator from './AdvancedCalculator';

import Box from '@mui/material/Box';

// Tabs
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import axios from 'axios'

import './App.css';
import stateRegionData from './state-regions.json'
import states from './states.json'


const Calculator = () => {
    const [loading, setLoading] = useState(false);   // Loading state of submit button, default set to false, onClick => set to true
    const [message, setMessage] = useState('');
    const [results, setResults] = useState('');

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

    // State for managing tabs in the calculator section
    const [calculatorTabValue, setCalculatorTabValue] = React.useState('1');
    const handleCalculatorTabChange = (event, newValue) => {
        setCalculatorTabValue(newValue);
      };

    async function handleSubmit(event){
        setLoading(true); // Set the submit button to loading state
        event.preventDefault();

        // PSO API configs
        // const url = 'http://localhost:5000/submit'; // Uncomment for local development
        const url = 'https://backend-dot-sama-web-app.uc.r.appspot.com/submit'; // Comment out during local development

        // Set up config for GET request
        let config = { 
            params: { 
                zipcode: formData.zipcode,
                pv_cost: formData.PVCost,
                diesel_generator_cost: formData.dieselGeneratorCost,
                battery_cost: formData.batteryCost,
                battery_charger_cost: formData.batteryChargerCost
            },
            responseType: 'application/json' // python flask send_file() returns an array buffer for the png image
        };

        // Verify inputs
        if (formData.zipcode === '') {
            setMessage('Please enter a valid zipcode.');
            setLoading(false);
            return;
        }

        await axios.get(url, config)
            .then(response => {
                setMessage('Here is your figure!');
                        
                // set image src with base64 in API response
                document.getElementById("figure").src = `data:image/png;base64,${JSON.parse(response.data)["image"]}`;
                
                // format the output text results and display as a list 
                let data = JSON.parse(response.data)["text"];
                let arr = [];
                Object.keys(data).forEach(function(key) {
                  arr.push([key, data[key][0], data[key][1]]);
                });
                console.log(data);
                setResults(
                    <p>
                        {arr.map(item => <li>{item[0] + ": " + item[1] + " " + item[2]}</li>)}
                    </p>
                );
                
                // stop the loading on submit button
                setLoading(false);
                return;    
            })
            .catch(error => {
                // Display error message
                if (error.response) {
                    setMessage(error.response.data);
                } else {    
                    setMessage("Error accessing backend. Please try again later.");
                }
                // Set results to empty
                setResults('');
                document.getElementById("figure").src = '';
                setLoading(false); // Stop loading
            });
    };

    return (
        <Box id="calculator" sx={{ padding: "100px" }}>
            <h1>SAMA Grid Defection</h1>
            <p>This application currently only supports US locations.</p>
            <br></br>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={calculatorTabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleCalculatorTabChange} centered aria-label="calculator tabs" textColor="secondary" indicatorColor="secondary">
                            <Tab label="General User" value="1" />
                            <Tab label="Advanced User" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {
                            <GeneralCalculator />
                        }
                    </TabPanel>
                    <TabPanel value="2">
                        {   
                            <AdvancedCalculator />
                        }
                    </TabPanel>
                    <p style={{ fontStyle: "italic" }}>It can take up to 1 min to calculate your results.</p>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<Search />}
                        variant="contained"
                        type="submit"
                        style={{margin: '10px'}}
                        sx={{ backgroundColor:"#4F2683", color: "white", fontWeight: "600" }}
                    >
                    Submit
                    </LoadingButton>
                </TabContext>
            </Box>

            <br></br>
            <h2>{message}</h2>
            <img id="figure" style={{ width: "100%" }}></img>
            <p>{results}</p>
        </Box>
            
      );
}

export default Calculator;