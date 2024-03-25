import React from 'react';
import { Grid } from '@mui/material';
import StandardField from '../field_components/FieldComponent';

const TieredRate = () => {
    const tieredRateFields = [
        { label: 'Low Tier Price', name: 'lowTierPrice', unit: '$' },
        { label: 'Low Tier Max Load', name: 'lowTierMaxLoad', unit: 'kW' },
        { label: 'Medium Tier Price', name: 'mediumTierPrice', unit: '$' },
        { label: 'Medium Tier Max Load', name: 'mediumTierMaxLoad', unit: 'kW' },
        { label: 'High Tier Price', name: 'highTierPrice', unit: '$' },
        { label: 'High Tier Max Load', name: 'highTierMaxLoad', unit: 'kW' }
    ];

    return (
        <Grid container>
            {tieredRateFields.map((field, index) => {
                return (
                    <Grid item xs={6} key={index}>
                        <StandardField name={field.name} label={field.label} defaultValue='' unit={field.unit} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default TieredRate;
