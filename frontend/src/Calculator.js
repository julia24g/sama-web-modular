import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form'; // Import useForm and FormProvider from React Hook Form
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

import axios from 'axios';

import './App.css';

const Calculator = () => {
    const methods = useForm();
    const [loading, setLoading] = useState(false);   // Loading state of submit button, default set to false, onClick => set to true
    const [message, setMessage] = useState('');
    const [results, setResults] = useState('');

    // State for managing tabs in the calculator section
    const [calculatorTabValue, setCalculatorTabValue] = React.useState('1');
    const handleCalculatorTabChange = (event, newValue) => {
        setCalculatorTabValue(newValue);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        const url = 'http://localhost:5000/submit';
        let config = {
            params: data,
            responseType: 'application/json'
        };

        try {
            const response = await axios.get(url, config);
            setMessage(response.data.message);
            // Process response here
            setLoading(false);
        } catch (error) {
            setMessage('Error accessing backend. Please try again later.');
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            setLoading(false);
        }
    };
        
    return (
        <FormProvider {...methods}>
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
                    </TabContext>
                </Box>

                <br></br>
                <h2>{message}</h2>
                <img id="figure" style={{ width: "100%" }}></img>
                <p>{results}</p>
            </Box>
        </FormProvider>

    );
}

export default Calculator;