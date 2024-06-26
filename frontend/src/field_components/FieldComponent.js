import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import '../styling/Form.css';

const StandardField = ({ name, label, defaultValue, unit }) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          required
          label={label}
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">{unit}</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: "210px", margin: '10px'}}
        />
      )}
    />
  );
};

export default StandardField;
