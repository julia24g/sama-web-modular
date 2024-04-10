import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { Controller } from 'react-hook-form';

const YesNo = ({ name }) => {
  return (
    <Controller className='yesNo'
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
            label="Yes"
            labelPlacement="end"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="No"
            labelPlacement="end"
          />
        </RadioGroup>
      )}
    />
  );
};

export default YesNo;
