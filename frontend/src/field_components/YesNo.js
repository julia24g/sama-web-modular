import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useFormContext } from 'react-hook-form';

const YesNo = ({ name }) => {
  const { setValue, watch } = useFormContext();
  // Use null as the initial state to ensure the component is controlled
  const answer = watch(name, null);

  const handleAnswerChange = (event) => {
    // Convert string 'true' or 'false' to boolean and update the field value
    setValue(name, event.target.value === 'true');
  };

  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="answer"
          name={name}
          // Handle null and boolean values properly
          value={answer === null ? '' : String(answer)} // Convert boolean or null to string for RadioGroup value
          onChange={handleAnswerChange}
          row
        >
          <FormControlLabel
            value="true" // Keep using string values for the Radio button values
            control={<Radio />}
            label="Yes"
            labelPlacement="end"
          />
          <FormControlLabel
            value="false" // Keep using string values for the Radio button values
            control={<Radio />}
            label="No"
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default YesNo;
