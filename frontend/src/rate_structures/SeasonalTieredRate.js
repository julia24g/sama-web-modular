import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const SeasonalTieredRate = () => {
  const { control } = useFormContext(); // Access form control context

  // Define fields for both summer and winter, each having low, medium, and high tiers
  const seasonalTieredRateFields = {
    'Summer': [
      { label: 'Summer Low Tier Price', name: 'summerLowTierPrice' },
      { label: 'Summer Low Tier Max Load', name: 'summerLowTierMaxLoad' },
      { label: 'Summer Medium Tier Price', name: 'summerMediumTierPrice' },
      { label: 'Summer Medium Tier Max Load', name: 'summerMediumTierMaxLoad' },
      { label: 'Summer High Tier Price', name: 'summerHighTierPrice' },
      { label: 'Summer High Tier Max Load', name: 'summerHighTierMaxLoad' }
    ],
    'Winter': [
      { label: 'Winter Low Tier Price', name: 'winterLowTierPrice' },
      { label: 'Winter Low Tier Max Load', name: 'winterLowTierMaxLoad' },
      { label: 'Winter Medium Tier Price', name: 'winterMediumTierPrice' },
      { label: 'Winter Medium Tier Max Load', name: 'winterMediumTierMaxLoad' },
      { label: 'Winter High Tier Price', name: 'winterHighTierPrice' },
      { label: 'Winter High Tier Max Load', name: 'winterHighTierMaxLoad' }
    ]
  };

  return (
    <>
      {Object.entries(seasonalTieredRateFields).map(([season, fields], seasonIndex) => (
        <div key={seasonIndex}>
          <Typography variant="h6" style={{ margin: '20px 0' }}>{season} Rates</Typography>
          <Grid container>
            {fields.map((field, index) => (
              <Grid item xs={6} key={index}> {/* xs={6} makes each TextField take half width of the container */}
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue=""
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      label={field.label}
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

export default SeasonalTieredRate;