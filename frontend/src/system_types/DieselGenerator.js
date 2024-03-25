import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';
import '../style/App.css';

const DieselGenerator = () => {
  const dieselGeneratorFields = [
    { question: 'What is the capital cost of the diesel generator per kW installed (USD)?', label: 'Capital Cost of DG', name: 'C_DG', defaultValue: '240.45', unit: '$' },
    { question: 'What is the replacement cost of the diesel generator per kW (USD)?', label: 'Replacement Cost of DG', name: 'R_DG', defaultValue: '240.45', unit: '$' },
    { question: 'What is the operations and maintenance cost of the diesel generator per kW per year (USD)?', label: 'O&M Cost of DG', name: 'MO_DG', defaultValue: '0.064', unit: '$' },
    { question: 'What is the lifetime of the diesel generator (hours)?', label: 'DG Lifetime', name: 'TL_DG', defaultValue: '24000', unit: '' },
  ];

  return (
    <div className="form">
      {dieselGeneratorFields.map((field, index) => (
        <div key={index}>
          <p>{field.question}</p>
          <Controller
            name={field.name}
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

export default DieselGenerator;