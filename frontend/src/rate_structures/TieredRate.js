import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const TieredRate = () => {
    const { control } = useFormContext(); // Access form control context

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
                console.log(field.label);
                return (
                    <Grid item xs={6} key={index}> {/* xs={6} makes each TextField take half width of the container */}
                        <Controller
                            name={field.name}
                            control={control}
                            defaultValue=""
                            render={({ field: controllerField, fieldState: { error } }) => (
                                <TextField
                                    {...controllerField}
                                    label={field.label}
                                    variant="outlined"
                                    fullWidth
                                    error={!!error} // Check if there's an error specific to this field
                                    helperText={error ? error.message : null} // Show the error message if it exists
                                />
                            )}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default TieredRate;
