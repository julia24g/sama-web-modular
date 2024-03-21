import React from 'react';
import AnalyticEcommerce from './components/cards/statistics/AnalyticEcommerce';

// material-ui
import {
    Button,
    Grid,
    TextField,
    Typography
} from '@mui/material';

const Results = () => {
    const flaskServerUrl = 'http://127.0.0.1:5000';

    const imageFilename1 = 'Cash_Flow.png';
    const imageFilename2 = 'Daily-Monthly-Yearly_average_cost_of_energy_system.png';
    const imageFilename3 = 'Daily-Monthly-Yearly_average_cost_of_only_grid-connected_system.png';

    return (
        <>
            <h1>Images from Flask</h1>
            <img src={`${flaskServerUrl}/images/${imageFilename1}`} alt="Cash Flow" />
            <img src={`${flaskServerUrl}/images/${imageFilename2}`} alt="Daily Monthly Yearly Average Cost of Energy System" />
            <img src={`${flaskServerUrl}/images/${imageFilename3}`} alt="Daily Monthly Yearly Average Cost of Only Grid-Connected System" />

            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {/* row 1 */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Dashboard</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Optimum Size of PV System (kW)" count="4,42,236" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Optimum Size of Battery Energy Storage (kWh)" count="78,250" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Optimum Size of Diesel Generator (kW)" count="18,800" isLoss color="warning" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Optimum Size of Inverter (kW)" count="$35,078" isLoss color="warning" />
                </Grid>

                {/* row 2 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Net Present Cost of Project in 25 years" count="4,42,236" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Net Present Cost of Project in 25 years excluding 30% of Federal Incentives for RE" count="78,250" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Net Present Cost of Relying Fully on the Grid for 25 years" count="18,800" isLoss color="warning" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Levelized Cost of Electricity for Hybrid PV System" count="$35,078" isLoss color="warning" />
                </Grid>

                {/* row 3 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Levelized Cost of Electricity Excluding 30% of Federal Incentives for RE" count="4,42,236" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Levelized Cost of Electricity for Relying Fully on the Grid" count="78,250" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Initial cost of project" count="18,800" isLoss color="warning" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Initial Cost of Project Excluding 30% of Federal Incentives for RE" count="$35,078" isLoss color="warning" />
                </Grid>

                {/* row 4 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Operation and Maintenance Cost" count="4,42,236" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Total Money Paid by the User" count="78,250" />
                </Grid>

            </Grid>
        </>
    );
};

export default Results;