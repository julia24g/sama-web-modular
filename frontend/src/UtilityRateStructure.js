import React, { useState } from 'react';
import { Select, MenuItem, TextField, FormControl, InputLabel } from '@mui/material';
import { useForm } from './FormDataContext'; // Import the useForm hook

const UtilityRateStructure = () => {
  const { formData, dispatch } = useForm(); // Use the useForm hook
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
      { label: 'Low Tier Max Load', name: 'tieredRateField2' },
      { label: 'Medium Tier Price', name: 'tieredRateField3' },
      { label: 'Medium Tier Max Load', name: 'tieredRateField4' },
      { label: 'High Tier Price', name: 'tieredRateField5' },
      { label: 'High Tier Max Load', name: 'tieredRateField6' }
    ],
    'Seasonal Tiered Rate': [
      { label: 'Low Tier Price', name: 'seasonaltieredRateField1' },
      { label: 'Low Tier Max Load', name: 'seasonaltieredRateField2' },
      { label: 'Medium Tier Price', name: 'seasonaltieredRateField3' },
      { label: 'Medium Tier Max Load', name: 'seasonaltieredRateField4' },
      { label: 'High Tier Price', name: 'seasonaltieredRateField5' },
      { label: 'High Tier Max Load', name: 'seasonaltieredRateField6' }
    ],
    'Monthly Tiered Rate': [
      { label: 'Low Tier Price', name: 'monthlytieredRateField1' },
      { label: 'Low Tier Max Load', name: 'monthlytieredRateField2' },
      { label: 'Medium Tier Price', name: 'monthlytieredRateField3' },
      { label: 'Medium Tier Max Load', name: 'monthlytieredRateField4' },
      { label: 'High Tier Price', name: 'monthlytieredRateField5' },
      { label: 'High Tier Max Load', name: 'monthlytieredRateField6' }
    ],
    'Time of Use Rate': [
      { label: 'On-Peak Price', name: 'tieredRateField1' },
      { label: 'Mid-Peak Price', name: 'tieredRateField2' },
      { label: 'Off-Peak Price', name: 'tieredRateField3' },
      { label: 'Low Tier Max Load', name: 'tieredRateField4' },
      { label: 'Medium Tier Max Load', name: 'tieredRateField5' },
      { label: 'High Tier Max Load', name: 'tieredRateField6' }
    ]
  };

  const handleRateStructureChange = (event) => {
    const { name, value } = event.target;
    // Update the central form data directly
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        [name]: value,
      },
    });
    setSelectedRateStructure(event.target.value);
  };

  const renderRateStructureContent = () => {
    const fields = textFields[selectedRateStructure] || [];
    if (fields.length === 0) return null;

    const renderNonTieredFields = () => {
      return fields.map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          name={field.name}
          variant="outlined"
          size="small"
          style={{ width: '18%' }} // Adjust width as necessary
        />
      ));
    };

    // Function to render fields for tiered rates
    const renderTieredFields = () => {
      // Assuming every two fields represent a tier (Price and Max Load)
      const tiers = [];
      for (let i = 0; i < fields.length; i += 2) {
        tiers.push(
          <div key={i} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <TextField
              label={fields[i].label}
              name={fields[i].name}
              variant="outlined"
              size="small"
              style={{ width: '60%' }} // Adjust width as necessary for Price field
            />
            <TextField
              label={fields[i + 1].label}
              name={fields[i + 1].name}
              variant="outlined"
              size="small"
              style={{ width: '60%' }} // Adjust width as necessary for Max Load field
            />
          </div>
        );
      }
      return tiers;
    };

    const renderTieredFieldsWithTitles = (labels) => {
      const monthFields = fields.length / labels.length; // Calculate the number of fields for each month/season

      return labels.map((label, labelIndex) => (
        <div key={labelIndex}>
          <b style={{ paddingBottom: '20px' }}>{label}</b> {/* Title for the section */}
          {renderTieredFields()}
        </div>
      ));
    };

    const isTieredRate = ["Tiered Rate"].includes(selectedRateStructure);
    const isTieredWithTitles = ["Seasonal Tiered Rate", "Monthly Tiered Rate"].includes(selectedRateStructure);
    const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const seasonLabels = ['Summer', 'Winter'];

    return (
      <div>
        <p>Please input prices in $/kWh and load values in kWh.</p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap', // Allows fields to wrap in row layout
          gap: '10px', // Adds space between fields
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isTieredWithTitles ? renderTieredFieldsWithTitles(selectedRateStructure.includes('Monthly') ? monthLabels : seasonLabels) :
            isTieredRate ? renderTieredFields() :
              renderNonTieredFields()}
        </div>
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
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      {renderRateStructureContent()}
    </div>
  );
}

export default UtilityRateStructure;