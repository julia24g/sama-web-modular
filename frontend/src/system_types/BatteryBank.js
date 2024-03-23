import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';
import '../style/App.css';

const BatteryBank = () => {
  const { control } = useFormContext(); // Access form control context

  const batteryBankFields = [
    { question: 'What is the capital cost of the battery bank per kW installed (USD)?', label: 'Capital Cost of Battery', name: 'C_B', defaultValue: '460', unit: '$' },
    { question: 'What is the replacement cost of the battery bank per kW (USD)?', label: 'Replacement Cost of Battery', name: 'R_B', defaultValue: '460', unit: '$' },
    { question: 'What is the operations and maintenance cost of the battery bank per kW per year (USD)?', label: 'O&M Cost of Battery', name: 'batteryOandM', defaultValue: ' ', unit: '$'},
    { question: 'What is the battery bank yearly degradation?', label: 'Battery Degradation', name: 'batteryYearlyDegradation', defaultValue: ' ', unit: '' },
    { question: 'What is the battery bank minimum state of charge (SOC)?', label: 'Minimum SOC', name: 'SOC_min', defaultValue: '0.2', unit: '' },
    { question: 'What is the battery bank maximum state of charge (SOC)?', label: 'Maximum SOC', name: 'SOC_max', defaultValue: '1', unit: '' },
    { question: 'What is the battery bank voltage?', label: 'Battery Voltage', name: 'batteryVoltage', defaultValue: ' ', unit: '' }
  ];

  return (
    <div className="form">
      {batteryBankFields.map((field, index) => (
        <div key={index}>
          <p>{field.question}</p>
          <Controller
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                required
                label={field.label}
                variant="outlined"
                fullWidth
                style={{width: "210px", margin: '10px auto'}}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{field.unit}</InputAdornment>,
                }}
              />
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default BatteryBank;
