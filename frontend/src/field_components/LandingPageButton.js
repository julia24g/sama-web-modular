import React, {useContext} from 'react';
import { Box, Grid, Typography, ButtonBase } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsightsIcon from '@mui/icons-material/Insights';
import { CalculatorTabContext } from '../calculator/CalculatorTab';

const LandingPageButton = ({ title, text }) => {
    const Icon = title.toLowerCase() === 'advanced' ? InsightsIcon : TimelineIcon;
    const { setSelectedTab } = useContext(CalculatorTabContext);

    const handleButtonClick = () => {
        const tabValue = title.toLowerCase() === 'advanced' ? '2' : '1';
        setSelectedTab(tabValue);
        window.location.href = '#calculator';
    };

    return (
        <Grid item xs={12}>
            <ButtonBase onClick={handleButtonClick} style={{ width: '100%', textAlign: 'left'}}>
                <Box className="landingPageButton" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon fontSize="large" sx={{ mr: 2, color: '#4F2683' }} />
                    <Box>
                        <Typography variant="h6" className="title">
                            {title} Calculator
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {text}
                        </Typography>
                    </Box>
                </Box>
            </ButtonBase>
        </Grid>
    );
};

export default LandingPageButton;
