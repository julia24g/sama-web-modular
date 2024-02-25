import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const FlatRate = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="flatRateField1"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          label="Flat Price"
          variant="outlined"
          style={{ width: '18%' }}
        />
      )}
    />
  );
};

export default FlatRate;
