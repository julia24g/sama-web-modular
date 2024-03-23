import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';
import '../style/App.css';

const PVQuestions = () => {
  const { control } = useFormContext(); // Access form control context

  const pvQuestionFields = [
    { question: 'What is the capital cost of PV modules per kW installed (all costs in)?', label: 'Capital Cost of PV', name: 'PVCost', defaultValue: '540', unit: '$' },
    { question: 'What is the replacement cost of PV modules per kW?', label: 'Replacement Cost of PV', name: 'PVReplacementCost', defaultValue: '540', unit: '$' },
    { question: 'What are the operations and maintenance cost of PV modules per kW per year?', label: 'O&M Cost of PV', name: 'PVOandM', defaultValue: '29.49', unit: '$' },
    { question: 'What is the lifetime of the PV modules?', label: 'PV Lifetime', name: 'PVLifetime', defaultValue: '25', unit: '' },
  ];

  return (
    <div className="form">
      {pvQuestionFields.map((field, index) => (
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
                style={{ margin: '10px auto', width: '210px' }}
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

export default PVQuestions;
