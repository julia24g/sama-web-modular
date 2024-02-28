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
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Summer Price"
            variant="outlined"
            style={{ width: '18%' }}
            error={!!error} // Check if there's an error specific to this field
            helperText={error ? error.message : null} // Show the error message if it exists
          />
        )}
      />
      <Controller
        name="seasonalRateField2"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Winter Price"
            variant="outlined"
            style={{ width: '18%' }}
            error={!!error} // Check if there's an error specific to this field
            helperText={error ? error.message : null} // Show the error message if it exists
          />
        )}
      />
    </>
  );
};

export default SeasonalRate;
