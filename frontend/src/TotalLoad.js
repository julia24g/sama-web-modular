import React, { useState } from 'react';
import { TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form'; // Import useFormContext and Controller from react-hook-form

const TotalLoad = () => {
  const { control, setValue } = useFormContext();
  const [termType, setTermType] = useState('Annual');

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
            render={({ field }) => (
              <TextField
                {...field}
                label={`${label} Load`}
                variant="outlined"
                style={{ margin: '5px' }}
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
            />
          )}
        />
      )}
    </div>
  );
};

export default TotalLoad;
