import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { Controller } from 'react-hook-form';

const SelectOne = ({ name, label1, label2 }) => {
  return (
    <Controller className='selectOne'
      name={name}
      defaultValue={null}
      render={({field}) => (
        <RadioGroup 
          {...field}
          value={field.value === null ? '' : String(field.value)}
          row
          style={{ justifyContent: 'center' }}
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label={label1}
            labelPlacement="end"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label={label2}
            labelPlacement="end"
          />
        </RadioGroup>
      )}
    />
  );
};

export default SelectOne;
