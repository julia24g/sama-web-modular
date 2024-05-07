import React from 'react';
import { Grid, Typography } from '@mui/material';
import StandardField from '../field_components/FieldComponent';

const MonthlyTieredRate = () => {

  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const tierLabels = [
    { label: 'Low Tier Price', suffix: 'LowPrice', unit: '$' },
    { label: 'Low Tier Max Load', suffix: 'LowMaxLoad', unit: 'kW' },
    { label: 'Medium Tier Price', suffix: 'MedPrice', unit: '$' },
    { label: 'Medium Tier Max Load', suffix: 'MedMaxLoad', unit: 'kW' },
    { label: 'High Tier Price', suffix: 'HighPrice', unit: '$' },
    { label: 'High Tier Max Load', suffix: 'HighMaxLoad', unit: 'kW' }
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
                <StandardField name={`${month.toLowerCase()}${tier.suffix}`} label={`${tier.label}`} defaultValue='' unit={tier.unit} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </>
  );
};

export default MonthlyTieredRate;
