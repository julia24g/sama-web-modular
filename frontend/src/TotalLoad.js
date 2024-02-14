import React, { useState } from 'react';
import { TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useForm } from './FormDataContext'; // Import the useForm hook

const TotalLoad = () => {
  const { formData, dispatch } = useForm(); // Use the useForm hook
  const [termType, setTimeInput] = useState('Annual');
  const [values, setValues] = useState(Array.from({ length: 12 }, () => ''));
  const [yearlyValue, setYearlyValue] = useState('');

  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleTimeInputChange = (event, newTime) => {
    if (newTime !== null) {
      setTimeInput(newTime);

      dispatch({
        type: 'UPDATE_FORM_DATA',
        payload: {
          ...formData,
          isAnnual: newTime === 'Annual'
        },
      });
    }
  };

  const handleMonthlyValueChange = (index, newValue) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
    // Dispatch the updated monthly values to the central form data
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        [`monthlyLoad${index + 1}`]: newValue,
      },
    });
  };

  const handleYearlyValueChange = (event) => {
    const newValue = event.target.value;
    setYearlyValue(newValue);

    // Dispatch the updated yearly value to the central form data
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        yearlyValueField: newValue,
      },
    });
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
        <div>
          {values.map((value, index) => (
            <TextField
              key={index}
              label={`${monthLabels[index]} Load`}
              variant="outlined"
              value={value}
              onChange={(event) => handleMonthlyValueChange(index, event.target.value)}
              style={{ margin: '5px'}}
            />
          ))}
        </div>
      ) : (
        <TextField
          label="Annual Load"
          variant="outlined"
          value={formData.annualTotalLoad}
          onChange={handleYearlyValueChange}
        />
      )}
    </div>
  );
};

export default TotalLoad;
