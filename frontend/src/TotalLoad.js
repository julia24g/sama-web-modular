import React, { useState } from 'react';
import { TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';

const TimeInput = () => {
  const [termType, setTimeInput] = useState('Monthly');
  const [value, setValue] = useState('');

  const handleTimeInputChange = (event, newTime) => {
    if (newTime !== null) {
      setTimeInput(newTime);
    }
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
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
      <TextField
        label={`Enter ${termType} Amount`}
        variant="outlined"
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default TimeInput;
