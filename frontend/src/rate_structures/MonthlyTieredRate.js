import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const MonthlyTieredRate = () => {
  const { control } = useFormContext(); // Access form control context

  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const tierLabels = [
    { label: 'Low Tier Price', suffix: 'LowPrice' },
    { label: 'Low Tier Max Load', suffix: 'LowMaxLoad' },
    { label: 'Medium Tier Price', suffix: 'MedPrice' },
    { label: 'Medium Tier Max Load', suffix: 'MedMaxLoad' },
    { label: 'High Tier Price', suffix: 'HighPrice' },
    { label: 'High Tier Max Load', suffix: 'HighMaxLoad' }
  ];

  return (
    <>
      {monthLabels.map((month, monthIndex) => (
        <div key={monthIndex} style={{ marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {month} Rates
          </Typography>
          <Grid container>
            {tierLabels.map((tier, tierIndex) => (
              <Grid item xs={6} key={tierIndex}>
                <Controller
                  name={`${month.toLowerCase()}${tier.suffix}`}
                  control={control}
                  defaultValue=""
                  render={({ field: controllerField, fieldState: { error } }) => (
                    <TextField
                      {...controllerField}
                      label={`${tier.label}`}
                      variant="outlined"
                      fullWidth
                      error={!!error} // Check if there's an error specific to this field
                      helperText={error ? error.message : null} // Show the error message if it exists
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </>
  );
};

export default MonthlyTieredRate;
