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
          render={({ field }) => (
            <TextField
              {...field}
              label={`${month} Price`}
              variant="outlined"
              style={{ width: '18%'}}
            />
          )}
        />
      ))}
    </div>
  );
};

export default MonthlyRate;
