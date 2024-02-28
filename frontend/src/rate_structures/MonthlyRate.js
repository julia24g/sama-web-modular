import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const MonthlyRate = () => {
  const { control } = useFormContext(); // Access form control context
  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      {monthLabels.map((month, index) => (
        <Controller
          key={index}
          name={`monthlyRate${index + 1}`} // Naming fields as monthlyRate1, monthlyRate2, etc.
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={`${month} Price`}
              variant="outlined"
              style={{ width: '18%'}}
              error={!!error} // Check if there's an error specific to this field
              helperText={error ? error.message : null} // Show the error message if it exists
            />
          )}
        />
      ))}
    </div>
  );
};

export default MonthlyRate;
