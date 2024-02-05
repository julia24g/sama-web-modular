import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useForm } from './FormDataContext'; // Import the useForm hook

const YesNoQuestion = () => {
  const { formData, dispatch } = useForm(); // Use the useForm hook
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData, // Preserve existing form data
        [name]: value, // Update the field with the new value
      },
    });
    setAnswer(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="answer"
          name="answer"
          value={answer}
          onChange={handleAnswerChange}
          row
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

export default YesNoQuestion;
