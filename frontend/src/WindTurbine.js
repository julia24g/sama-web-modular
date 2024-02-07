import React from 'react';
import { TextField } from '@mui/material';
import './App.css';
import { useForm } from './FormDataContext'; // Import the useForm hook


const WindTurbine = () => {
  const { formData, dispatch } = useForm(); // Use the useForm hook

  const handleAnswerChange = (event) => {
    const { name, value } = event.target;
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
    <p>What is the capital cost of the wind turbine per KW installed (all costs in)?</p>
    <TextField
        required
        label="Capital Cost of WT" 
        variant="outlined" 
        value={formData.WTCost}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the replacement cost of the wind turbine per KW?</p>
    <TextField
        required
        label="Replacement Cost of WT" 
        variant="outlined" 
        value={formData.WTReplacementCost}
        onChange={handleAnswerChange}
        style={{width: "250px", margin: '10px auto'}}
    />
    <p>What is the operations and maintenance cost of the wind turbine per KW per year?</p>
    <TextField
        required
        label="O&M Cost of WT" 
        variant="outlined" 
        value={formData.WTOandM}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the lifetime of the wind turbines?</p>
    <TextField
        required
        label="WT Lifetime" 
        variant="outlined" 
        value={formData.WTLifetime}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    </form>
  );
};

export default WindTurbine;
