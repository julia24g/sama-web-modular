import React from 'react';
import { Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const SystemSelectionForm = () => {
  const systemOptions = [
    { label: "Photovoltaic", value: "photovoltaic" },
    { label: "Diesel Generator", value: "dieselGenerator" },
    { label: "Battery Bank", value: "batteryBank" }
  ];

  return (
    <div>
      {systemOptions.map((option) => (
        <Controller
          name={option.value}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />  
              }
              label={option.label}
            />
          )}
          />
      ))}
    </div>
  );
};

export default SystemSelectionForm;
