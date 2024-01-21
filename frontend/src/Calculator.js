import React, { useState } from 'react';
import { TextField, accordionActionsClasses } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

    // Function for getting default values of form variables
    const handleCalculatorInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

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
            <h1>SAMA CALCULATOR</h1>
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
                            <Accordion sx={{ marginInline: "10%" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography sx={{fontWeight: "500"}}>Advanced System Specification</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{textAlign:"left", textStyle: "italic"}}>
                                        Default values are specified. 
                                        Advanced users may use custom values to fine-tune the parameters for a more accurate result.
                                    </Typography>
                                    <br></br>
                                    <TextField
                                        label="System Capacity" 
                                        variant="outlined" 
                                        value={formData.systemCapacity}
                                        onChange={handleCalculatorInputChange}
                                        style={{margin: '10px'}}
                                    />
                                    <TextField
                                        label="Cost of PV modules per KW" 
                                        variant="outlined" 
                                        value={formData.PVCost}
                                        onChange={handleCalculatorInputChange}
                                        style={{margin: '10px'}}
                                    />
                                    <TextField
                                        id="outlined-basic" 
                                        label="Cost of Diesel Generator per KW" 
                                        variant="outlined" 
                                        value={formData.dieselGeneratorCost}
                                        onChange={handleCalculatorInputChange}
                                        style={{margin: '10px'}}
                                    />
                                    <TextField
                                        label="Cost of Battery per KWh" 
                                        variant="outlined" 
                                        value={formData.batteryCost}
                                        onChange={handleCalculatorInputChange}
                                        style={{margin: '10px'}}
                                    />
                                    <TextField
                                        label="Cost of Battery Charger per KW" 
                                        variant="outlined" 
                                        value={formData.batteryChargerCost}
                                        onChange={handleCalculatorInputChange}
                                        style={{margin: '10px'}}
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <br></br>
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
                        </form>
                        }
                    </TabPanel>
                    <TabPanel value="2">
                        {   
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
                            
                        }
                    </TabPanel>
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