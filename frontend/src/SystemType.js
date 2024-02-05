import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IconButton } from '@mui/material';
import { useForm } from './FormDataContext'; // Import the useForm hook

const SystemSelectionForm = () => {
  const { formData, dispatch } = useForm(); // Use the useForm hook
  const [selectedSystems, setSelectedSystems] = useState([]);

  const handleSystemChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData, // Preserve existing form data
        [name]: value, // Update the field with the new value
      },
    });
    if (selectedSystems.includes(value)) {
      setSelectedSystems(selectedSystems.filter((system) => system !== value));
    } else {
      setSelectedSystems([...selectedSystems, value]);
    }
  };

  const systemOptions = [
    { label: "Photovoltaic", value: "photovoltaic" },
    { label: "Wind Turbine", value: "windTurbine" },
    { label: "Diesel Generator", value: "dieselGenerator" },
    { label: "Battery Bank", value: "batteryBank" }
  ];

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {systemOptions.map((option) => (
          <div key={option.value} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <IconButton
              size="small"
              onClick={() => handleSystemChange({ target: { value: option.value } })}
              color={selectedSystems.includes(option.value) ? 'primary' : 'default'}
            >
            </IconButton>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSystems.includes(option.value)}
                  onChange={handleSystemChange}
                  value={option.value}
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
