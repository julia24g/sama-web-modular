import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IconButton } from '@mui/material';
import { useForm } from './FormDataContext'; // Import the useForm hook

const SystemSelectionForm = ({ onSystemsSelected }) => {
  const { formData, dispatch } = useForm(); // Use the useForm hook

  const handleSystemChange = (event) => {
    const { name, checked } = event.target;

    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData, // Preserve existing form data
        [name]: checked, // Update the field with the new value
      },
    });
  };

  const systemOptions = [
    { label: "Photovoltaic", value: "photovoltaic" },
    { label: "Diesel Generator", value: "dieselGenerator" },
    { label: "Battery Bank", value: "batteryBank" }
  ];

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {systemOptions.map((option) => (
          <div key={option.value} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  name={option.value} // Use `name` to identify the system
                  checked={!!formData[option.value]} // Use form data to determine if checked
                  onChange={handleSystemChange}
                />
              }
              label={option.label}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default SystemSelectionForm;
