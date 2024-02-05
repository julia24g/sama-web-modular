import React, { useState } from 'react';
import { TextField } from '@mui/material';
import YesNo from './YesNo';
import './App.css';
import { useForm } from './FormDataContext'; // Import the useForm hook


const PVQuestions = () => {
  const { formData, dispatch } = useForm(); // Use the useForm hook

  const handleAnswerChange = (event) => {
    const { name, value } = event.target;
    // Update the central form data directly
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        [name]: value,
      },
    });
  };

  return (
    <form className="form">
    <p>What is the capital cost of PV modules per KW installed (all costs in)?</p>
    <TextField
        required
        label="Capital Cost of PV" 
        variant="outlined" 
        value={formData.PVCost}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    </form>
  );
};

export default PVQuestions;
