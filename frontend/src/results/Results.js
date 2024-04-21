import React from 'react';
import { Grid, ImageList, ImageListItem } from '@mui/material';
import DataCard from '../field_components/DataCard';
import { useLocation } from 'react-router-dom';

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
    const location = useLocation();
    const { results } = location.state || {}; // Default to an empty object if state is undefined

    const flaskServerUrl = 'https://sama.eng.uwo.ca';
    const diagrams = [
        { img: `${flaskServerUrl}/api/images/Cash_Flow.png`, title: "Cash Flow" },
        { img: `${flaskServerUrl}/api/images/Daily-Monthly-Yearly_average_cost_of_energy_system.png`, title: "Daily Monthly Yearly Average Cost of Energy System" },
        { img: `${flaskServerUrl}/api/images/Daily-Monthly-Yearly_average_cost_of_only_grid-connected_system.png`, title: "Daily Monthly Yearly Average Cost of Only Grid-Connected System" }
    ];

    return (
        <>
            <h1>Results</h1>
            <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={164}>
                {diagrams.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

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
