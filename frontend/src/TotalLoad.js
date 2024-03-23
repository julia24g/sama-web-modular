import React, { useEffect, useState } from 'react';
import { TextField, ToggleButtonGroup, ToggleButton, InputAdornment } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form'; // Import useFormContext and Controller from react-hook-form

const TotalLoad = () => {
  const { control, register, unregister, setValue, formState: { errors }, watch } = useFormContext();
  const [termType, setTermType] = useState('Annual');

  const isAnnual = watch('isAnnual');

  useEffect(() => {
    if (!isAnnual) {
      monthLabels.forEach((_, index) => {
        register(`monthlyLoad${index + 1}`);
      });
    } else {
      monthLabels.forEach((_, index) => {
        unregister(`monthlyLoad${index + 1}`);
      });
    }
  }, [isAnnual, register, unregister]);

  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleTimeInputChange = (event, newTermType) => {
    if (newTermType !== null) {
      setTermType(newTermType);
      setValue("isAnnual", newTermType === 'Annual');
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        size="small"
        value={termType}
        exclusive
        onChange={handleTimeInputChange}
        aria-label="Term Type"
        style={{ margin: '10px', textTransform: 'none' }}
      >
        <ToggleButton value="Monthly" aria-label="monthly" style={{ textTransform: 'capitalize' }}>
          Monthly
        </ToggleButton>
        <ToggleButton value="Annual" aria-label="annual" style={{ textTransform: 'capitalize' }}>
          Annual
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      {termType === 'Monthly' ? (
        monthLabels.map((label, index) => (
          <Controller
            key={index}
            name={`monthlyLoad${index + 1}`}
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={`${label} Load`}
                variant="outlined"
                style={{ margin: '5px' }}
                error={!!error} // Check if there's an error specific to this field
                helperText={error ? error.message : null} // Show the error message if it exists
                InputProps={{
                  startAdornment: <InputAdornment position="start">kW</InputAdornment>,
                }}
              />
            )}
          />
        ))
      ) : (
        <Controller
          name="annualTotalLoad"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Annual Load"
              variant="outlined"
              style={{ margin: '5px' }}
              error={!!errors.annualTotalLoad}
              helperText={errors.annualTotalLoad ? errors.annualTotalLoad.message : null}
              InputProps={{
                startAdornment: <InputAdornment position="start">kW</InputAdornment>,
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default TotalLoad;
