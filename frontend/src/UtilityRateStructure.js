import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Select, MenuItem, TextField, FormControl, InputLabel } from '@mui/material';

const UtilityRateStructure = () => {
  // State to store the selected option
  const [selectedRateStructure, setSelectedRateStructure] = useState('');

  // Array of options
  const rateStructures = [
    "Flat Rate", 
    "Seasonal Rate", 
    "Monthly Rate", 
    "Tiered Rate", 
    "Seasonal Tiered Rate", 
    "Monthly Tiered Rate", 
    "Time of Use Rate"
  ];

  // Define arrays of text fields for each rate structure
  const textFields = {
    'Flat Rate': [
      { label: 'Flat Price', name: 'flatRateField1' }
    ],
    'Seasonal Rate': [
      { label: 'Summer Price', name: 'seasonalRateField1' },
      { label: 'Winter Price', name: 'seasonalRateField2' }
    ],
    'Monthly Rate': [
        { label: 'January Price', name: 'monthlyRateField1' },
        { label: 'February Price', name: 'monthlyRateField2' },
        { label: 'March Price', name: 'monthlyRateField3' },
        { label: 'April Price', name: 'monthlyRateField4' },
        { label: 'May Price', name: 'monthlyRateField5' },
        { label: 'June Price', name: 'monthlyRateField6' },
        { label: 'July Price', name: 'monthlyRateField7' },
        { label: 'August Price', name: 'monthlyRateField8' },
        { label: 'September Price', name: 'monthlyRateField9' },
        { label: 'October Price', name: 'monthlyRateField10' },
        { label: 'November Price', name: 'monthlyRateField11' },
        { label: 'December Price', name: 'monthlyRateField12' }
    ],
    'Tiered Rate': [
        { label: 'Low Tier Price', name: 'tieredRateField1' },
        { label: 'Medium Tier Price', name: 'tieredRateField2' },
        { label: 'High Tier Price', name: 'tieredRateField3' },
        { label: 'Low Tier Max Load', name: 'tieredRateField4' },
        { label: 'Medium Tier Max Load', name: 'tieredRateField5' },
        { label: 'High Tier Max Load', name: 'tieredRateField6' }
    ],

    // Define for other rate structures similarly
  };

  const handleRateStructureChange = (event) => {
    setSelectedRateStructure(event.target.value);
  };

  const renderRateStructureContent = () => {
    const fields = textFields[selectedRateStructure] || [];
    if(fields.length === 0) return null;

    return (
      <div>
        <p>Please input prices in cents/kWh and load values in kWh.</p>
        {/* Render TextFields */}
        {fields.map((field, index) => (
          <TextField
            size="small"
            key={index}
            label={field.label}
            name={field.name}
            style={{margin: '5px', width: '150px' }}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
        <FormControl style={{ minWidth: 200, margin: 10 }}>
        <InputLabel id="rate-structure-select-label">Rate Structure</InputLabel>
        <Select
          labelId="rate-structure-select-label"
          id="rate-structure-select"
          value={selectedRateStructure}
          label="Rate Structure"
          onChange={handleRateStructureChange}
        >
          {rateStructures.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <br></br>
        {renderRateStructureContent()}
    </div>
    );
}

export default UtilityRateStructure;
