import React from 'react';
import GeneralCalculator from './GeneralCalculator';
import AdvancedCalculator from './AdvancedCalculator';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Calculator = () => {
    const [calculatorTabValue, setCalculatorTabValue] = React.useState('1');
    const handleCalculatorTabChange = (event, newValue) => {
        setCalculatorTabValue(newValue);
    };

    return (
        <Box id="calculator" sx={{ padding: "100px" }}>
            <h1>SAMA Grid Defection</h1>
            <p>The <b>General Calculator</b> is ideal for quick grid defection estimates or for newcomers to energy systems.The <b>Advanced Calculator</b> is tailored for researchers seeking precision with detailed input options. Please select the appropriate calculator for you.</p>
            <p><i>This application currently only supports US locations.</i></p>
            <br></br>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={calculatorTabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleCalculatorTabChange} centered aria-label="calculator tabs" textColor="secondary" indicatorColor="secondary">
                            <Tab label="General" value="1" />
                            <Tab label="Advanced" value="2" />
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
        </Box>

    );
}

export default Calculator;