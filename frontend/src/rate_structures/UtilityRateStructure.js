import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import FlatRate from './FlatRate';
import SeasonalRate from './SeasonalRate';
import MonthlyRate from './MonthlyRate';
import TieredRated from './TieredRate';
import SeasonalTieredRate from './SeasonalTieredRate';
import MonthlyTieredRate from './MonthlyTieredRate';
import TimeOfUse from './TOURate';

const UtilityRateStructure = () => {
  const [selectedRateStructure, setSelectedRateStructure] = useState('');

  const rateStructures = ["Flat Rate", "Seasonal Rate", "Monthly Rate", "Tiered Rate", "Seasonal Tiered Rate", "Monthly Tiered Rate", "Time of Use"]; // Add other rate structures as needed

  const handleRateStructureChange = (event) => {
    setSelectedRateStructure(event.target.value);
  };

  const renderRateStructureComponent = () => {
    switch (selectedRateStructure) {
      case 'Flat Rate':
        return <FlatRate />;
      case 'Seasonal Rate':
        return <SeasonalRate />;
      case 'Monthly Rate':
        return <MonthlyRate />;
      case 'Tiered Rate': 
        return <TieredRated />;
      case 'Seasonal Tiered Rate': 
        return <SeasonalTieredRate />;
      case 'Monthly Tiered Rate':
        return <MonthlyTieredRate />;
      case 'Time of Use':
        return <TimeOfUse />;
      default:
        return null;
    }
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
          {rateStructures.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      {renderRateStructureComponent()}
    </div>
  );
};

export default UtilityRateStructure;
