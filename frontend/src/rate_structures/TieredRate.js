import React from 'react';
import { Grid } from '@mui/material';
import StandardField from '../field_components/FieldComponent';

const TieredRate = () => {
    const tieredRateFields = [
        { label: 'Low Tier Price', name: 'lowTierPrice' },
        { label: 'Low Tier Max Load', name: 'lowTierMaxLoad' },
        { label: 'Medium Tier Price', name: 'mediumTierPrice' },
        { label: 'Medium Tier Max Load', name: 'mediumTierMaxLoad' },
        { label: 'High Tier Price', name: 'highTierPrice' },
        { label: 'High Tier Max Load', name: 'highTierMaxLoad' }
    ];

    return (
        <Grid container>
            {tieredRateFields.map((field, index) => {
                return (
                    <Grid item xs={6} key={index}> {/* xs={6} makes each TextField take half width of the container */}
                        <StandardField name={field.name} label={field.label} defaultValue='' unit='$' />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default TieredRate;
