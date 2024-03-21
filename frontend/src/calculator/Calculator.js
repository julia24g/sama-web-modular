import React, { useState } from 'react';

import GeneralCalculator from './GeneralCalculator';
import AdvancedCalculator from './AdvancedCalculator';

import Box from '@mui/material/Box';

// Tabs
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import '../style/App.css';

const Calculator = () => {


    // State for managing tabs in the calculator section
    const [calculatorTabValue, setCalculatorTabValue] = React.useState('1');
    const handleCalculatorTabChange = (event, newValue) => {
        setCalculatorTabValue(newValue);
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
                </TabContext>
            </Box>

            <br></br>
            <img id="figure" style={{ width: "100%" }}></img>
        </Box>

    );
}

export default Calculator;