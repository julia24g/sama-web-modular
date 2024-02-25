// YesNo.js
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useFormContext } from 'react-hook-form'; // Import the useFormContext hook

const YesNo = ({ name }) => {
  const { register, setValue } = useFormContext(); // Use the useFormContext hook
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (event) => {
    const value = event.target.value;
    setValue(name, value); // Update the field with the new value
    setAnswer(value);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="answer"
          name={name}
          value={answer}
          onChange={handleAnswerChange}
          row
          {...register(name)} // Register the field with react-hook-form
        >
          <FormControlLabel
            value="Yes"
            control={<Radio />}
            label="Yes"
            labelPlacement="end"
          />
          <FormControlLabel
            value="No"
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
