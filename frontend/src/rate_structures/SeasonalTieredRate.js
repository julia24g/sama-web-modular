import React from 'react';
import { Grid, Typography } from '@mui/material';
import StandardField from '../field_components/FieldComponent';

const SeasonalTieredRate = () => {

  const seasonLabels = ['Summer', 'Winter'];

  const seasonalTieredRateFields = [
    { label: 'Low Tier Price', suffix: 'LowTierPrice' },
    { label: 'Low Tier Max Load', suffix: 'LowTierMaxLoad' },
    { label: 'Medium Tier Price', suffix: 'MediumTierPrice' },
    { label: 'Medium Tier Max Load', suffix: 'MediumTierMaxLoad' },
    { label: 'High Tier Price', suffix: 'HighTierPrice' },
    { label: 'High Tier Max Load', suffix: 'HighTierMaxLoad' }
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
