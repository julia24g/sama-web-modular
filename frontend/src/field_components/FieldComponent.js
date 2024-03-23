import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';

const StandardField = ({ name, label, defaultValue, unit }) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          value={value ?? ''}
          onChange={onChange}
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
          style={{ width: "210px", margin: '10px auto' }}
        />
      )}
    />
  );
};

export default StandardField;
