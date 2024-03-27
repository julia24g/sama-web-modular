import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import DataCard from '../field_components/DataCard';

const dataCards = [
    { title: "Optimum Size of PV System", key: "Cpv", unit: 'kW' },
    { title: "Optimum Size of Battery Energy Storage", key: "Cbat", unit: 'kW' },
    { title: "Optimum Size of Diesel Generator", key: "Cdg", unit: 'kW' },
    { title: "Optimum Size of Inverter", key: "Cinverter", unit: 'kW' },
    { title: "Net Present Cost of Project in 25 years", key: "NPC", unit: '$' },
    { title: "Net Present Cost of Project in 25 years excluding 30% of Federal Incentives for RE", key: "NPC_without_incentives", unit: '$' },
    { title: "Net Present Cost of Relying Fully on the Grid for 25 Years", key: "NPC_Grid", unit: '$' },
    { title: "Levelized Cost of Electricity for Hybrid PV System", key: "LCOE", unit: '$' },
    { title: "Levelized Cost of Electricity Excluding 30% of Federal Incentives for RE", key: "LCOE_without_incentives", unit: '$' },
    { title: "Levelized Cost of Electricity for Relying Fully on the Grid", key: "LCOE_Grid", unit: '$' },
    { title: "Initial Cost of Project", key: "I_Cost", unit: '$' },
    { title: "Initial Cost of Project Excluding 30% of Federal Incentives for RE", key: "I_Cost_without_incentives", unit: '$' },
    { title: "Total Operation and Maintenance Cost", key: "MO_Cost", unit: '$' },
    { title: "Total Money Paid by the User", key: "NPC", unit: '$' },
];

const Results = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/results');
                setResults(response.data);
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
            <h1>Results</h1>
            <img
                src={`${flaskServerUrl}/images/${imageFilename1}`}
                alt="Cash Flow"
                style={{ width: '500px', height: 'auto' }}
            />
            <img
                src={`${flaskServerUrl}/images/${imageFilename2}`}
                alt="Daily Monthly Yearly Average Cost of Energy System"
                style={{ width: '500px', height: 'auto' }}
            />
            <img
                src={`${flaskServerUrl}/images/${imageFilename3}`}
                alt="Daily Monthly Yearly Average Cost of Only Grid-Connected System"
                style={{ width: '500px', height: 'auto' }}
            />

            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {dataCards.map((card) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={card.title}>
                        <DataCard
                            title={card.title}
                            count={results ? results[card.key] : 'Loading...'}
                            unit={card.unit}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Results;
