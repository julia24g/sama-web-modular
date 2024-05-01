import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import FlatRate from './FlatRate';
import SeasonalRate from './SeasonalRate';
import MonthlyRate from './MonthlyRate';
import TieredRated from './TieredRate';
import SeasonalTieredRate from './SeasonalTieredRate';
import MonthlyTieredRate from './MonthlyTieredRate';
import TimeOfUse from './TOURate';
import { useFormContext } from 'react-hook-form';
import RateStructureFieldMap from './RateStructureFieldMap';

const UtilityRateStructure = () => {
  const [selectedRateStructure, setSelectedRateStructure] = useState('');
  const previousRateStructureRef = useRef('Flat Rate');
  const { setValue, unregister } = useFormContext();
  const rateStructures = ["Flat Rate", "Seasonal Rate", "Monthly Rate", "Tiered Rate", "Seasonal Tiered Rate", "Monthly Tiered Rate", "Time of Use"];

  useEffect(() => {
    if (selectedRateStructure && previousRateStructureRef.current) {
      unregisterFields(previousRateStructureRef.current);
    }
    previousRateStructureRef.current = selectedRateStructure;
  }, [selectedRateStructure, unregister]);

  const unregisterFields = (rateStructureName) => {
    const fieldsToUnregister = RateStructureFieldMap[rateStructureName];
    fieldsToUnregister.forEach(fieldName => {
      unregister(fieldName);
    });
  };

  const handleRateStructureChange = (event) => {
    const newRateStructure = event.target.value;
    setSelectedRateStructure(newRateStructure);
    setValue('rateStructure', newRateStructure);
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
      <p>Select your utility rate structure and input values in dollars per kWh (USD).</p>
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
