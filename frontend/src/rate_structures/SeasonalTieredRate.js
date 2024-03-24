import React from 'react';
import { Grid, Typography } from '@mui/material';
import StandardField from '../field_components/FieldComponent';

const SeasonalTieredRate = () => {

  const seasonLabels = ['Summer', 'Winter'];

  const seasonalTieredRateFields = [
    { label: 'Low Tier Price', name: 'LowTierPrice' },
    { label: 'Low Tier Max Load', name: 'LowTierMaxLoad' },
    { label: 'Medium Tier Price', name: 'MediumTierPrice' },
    { label: 'Medium Tier Max Load', name: 'MediumTierMaxLoad' },
    { label: 'High Tier Price', name: 'HighTierPrice' },
    { label: 'High Tier Max Load', name: 'HighTierMaxLoad' }
  ];
  return (
    <>
      {seasonLabels.map((season, seasonIndex) => (
        <div key={seasonIndex} style={{ marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {season} Rates
          </Typography>
          <Grid container>
            {seasonalTieredRateFields.map((tier, tierIndex) => (
              <Grid item xs={6} key={tierIndex}>
                <StandardField name={`${season.toLowerCase()}${tier.suffix}`} label={`${tier.label}`} defaultValue='' unit='$' />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </>
  );
};

export default SeasonalTieredRate;
