import React, { useContext } from 'react';
import GeneralCalculator from './GeneralCalculator';
import AdvancedCalculator from './AdvancedCalculator';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './../styling/Form.css';
import { CalculatorTabContext } from './CalculatorTab';

const Calculator = () => {
    const { selectedTab, setSelectedTab } = useContext(CalculatorTabContext);
    const handleCalculatorTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box id="calculator" sx={{ padding: "100px" }}>
            <h1>SAMA Grid Defection</h1>
            <p><i>This application currently only supports US locations.</i></p>
            <br></br>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={selectedTab}>
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