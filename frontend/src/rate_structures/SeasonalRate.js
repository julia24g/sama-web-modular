import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const SeasonalRate = () => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name="seasonalRateField1"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Summer Price"
            variant="outlined"
            style={{ width: '18%' }}
          />
        )}
      />
      <Controller
        name="seasonalRateField2"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Winter Price"
            variant="outlined"
            style={{ width: '18%' }}
          />
        )}
      />
    </>
  );
};

export default SeasonalRate;
