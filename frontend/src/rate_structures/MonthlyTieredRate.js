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
    { label: 'Low Tier Price', suffix: 'Price' },
    { label: 'Low Tier Max Load', suffix: 'MaxLoad' },
    { label: 'Medium Tier Price', suffix: 'Price' },
    { label: 'Medium Tier Max Load', suffix: 'MaxLoad' },
    { label: 'High Tier Price', suffix: 'Price' },
    { label: 'High Tier Max Load', suffix: 'MaxLoad' }
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
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      label={`${tier.label}`}
                      variant="outlined"
                      fullWidth
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
