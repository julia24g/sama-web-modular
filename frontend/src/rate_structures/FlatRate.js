import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const FlatRate = () => {
  const { control } = useFormContext(); // Use the useFormContext hook

  return (
    <Controller
      name="flatRate"
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label="Flat Price"
          variant="outlined"
          style={{ width: '18%' }}
          error={!!error} // Check if there's an error specific to this field
          helperText={error ? error.message : null} // Show the error message if it exists
        />
      )}
    />
  );
};

export default FlatRate;
