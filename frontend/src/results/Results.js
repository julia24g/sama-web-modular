import React, { useEffect, useState } from 'react';
import AnalyticEcommerce from './dashboard_components/AnalyticEcommerce';
import axios from 'axios';

// material-ui
import {
    Button,
    Grid,
    TextField,
    Typography
} from '@mui/material';

const Results = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/results');
                setResults(response.data); // Assuming the response contains the data you need
            } catch (error) {
                console.error('Failed to fetch results', error);
            }
        };

        fetchResults();
    }, []);

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
                    <AnalyticEcommerce title="Optimum Size of PV System (kW)" count={results ? results.Cpv : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Optimum Size of Battery Energy Storage (kWh)" count={results ? results.Cbat : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Optimum Size of Diesel Generator (kW)" count={results ? results.Cdg : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Optimum Size of Inverter (kW)" count={results ? results.Cinverter : 'Loading...'} />
                </Grid>

                {/* row 2 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Net Present Cost of Project in 25 years" count={results ? results.NPC : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Net Present Cost of Project in 25 years excluding 30% of Federal Incentives for RE" count={results ? results.NPC_without_incentives : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Net Present Cost of Relying Fully on the Grid for 25 years" count={results ? results.NPC_Grid : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Levelized Cost of Electricity for Hybrid PV System" count={results ? results.LCOE : 'Loading...'} />
                </Grid>

                {/* row 3 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Levelized Cost of Electricity Excluding 30% of Federal Incentives for RE" count={results ? results.LCOE_without_incentives : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Levelized Cost of Electricity for Relying Fully on the Grid" count={results ? results.LCOE_Grid : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Initial Cost of Project" count={results ? results.I_Cost : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Initial Cost of Project Excluding 30% of Federal Incentives for RE" count={results ? results.I_Cost_without_incentives : 'Loading...'} />
                </Grid>

                {/* row 4 */}
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AnalyticEcommerce title="Total Operation and Maintenance Cost" count={results ? results.MO_Cost : 'Loading...'} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AnalyticEcommerce title="Total Money Paid by the User" count={results ? results.NPC : 'Loading...'} />
                </Grid>

            </Grid>
        </>
    );
};

export default Results;