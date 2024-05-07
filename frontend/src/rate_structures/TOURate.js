import React from 'react';
import HourSelector from '../field_components/HourSelector';
import StandardField from '../field_components/FieldComponent';
import { Grid, Typography } from '@mui/material';

const TOURate = () => {
    const seasonLabels = ['Summer', 'Winter'];
    const tierLabels = [
        { label: 'On-Peak Price', suffix: 'OnPeakPrice' },
        { label: 'Mid-Peak Price', suffix: 'MidPeakPrice' },
        { label: 'Off-Peak Price', suffix: 'OffPeakPrice' },
    ];

    return (
        <>
            {seasonLabels.map((season, seasonIndex) => (
                <div key={seasonIndex} style={{ marginBottom: '20px' }}>
                    <Typography gutterBottom>
                        {season} Rates
                    </Typography>
                    <Grid container>
                        {tierLabels.map((tier, tierIndex) => (
                            <Grid item key={tierIndex}>
                                <StandardField name={`${season.toLowerCase()}${tier.suffix}`} label={`${tier.label}`} defaultValue='' unit='$' />
                            </Grid>
                        ))}
                    </Grid>
                    <p>Please provide the hourly range(s) for on-peak hours.</p>
                    <HourSelector season={season.toLowerCase()} tier="On" />
                    <p>Please provide the hourly range(s) for mid-peak hours.</p>
                    <HourSelector season={season.toLowerCase()} tier="Mid"/>
                </div>
            ))}
        </>
    );
};

export default TOURate;