import React, { useEffect, useState } from 'react';
import { ToggleButtonGroup, ToggleButton, InputAdornment } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import StandardField from './field_components/FieldComponent';

const TotalLoad = () => {
  const { register, unregister, setValue, formState: { errors }, watch } = useFormContext();
  const [termType, setTermType] = useState('Annual');

  const isAnnual = watch('isAnnual');

  useEffect(() => {
    if (!isAnnual) {
      monthLabels.forEach((_, index) => {
        register(`monthlyLoad${index + 1}`);
      });
      unregister('annualTotalLoad');
    } else {
      monthLabels.forEach((_, index) => {
        unregister(`monthlyLoad${index + 1}`);
      });
      register('annualTotalLoad')
    }
  }, [isAnnual, register, unregister]);

  useEffect(() => {
    setValue('isAnnual', true);
  }, [setValue]);

  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleTimeInputChange = (event, newTermType) => {
    if (newTermType !== null) {
      setTermType(newTermType);
      setValue("isAnnual", newTermType === 'Annual');
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        size="small"
        value={termType}
        exclusive
        onChange={handleTimeInputChange}
        aria-label="Term Type"
        style={{ margin: '10px', textTransform: 'none' }}
      >
        <ToggleButton value="Monthly" aria-label="monthly" style={{ textTransform: 'capitalize' }}>
          Monthly
        </ToggleButton>
        <ToggleButton value="Annual" aria-label="annual" style={{ textTransform: 'capitalize' }}>
          Annual
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      {termType === 'Monthly' ? (
        monthLabels.map((label, index) => (
          <StandardField name={`monthlyLoad${index + 1}`} label={`${label} Load`} defaultValue='' unit='kW' />
        ))
      ) : (
        <StandardField name="annualTotalLoad" label="Annual Load" defaultValue={undefined} unit='kW' />
      )}
    </div>
  );
};

export default TotalLoad;
