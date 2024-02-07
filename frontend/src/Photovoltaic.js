import React from 'react';
import { TextField } from '@mui/material';
import './App.css';
import { useForm } from './FormDataContext'; // Import the useForm hook


const PVQuestions = () => {
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
    <p>What is the capital cost of PV modules per KW installed (all costs in)?</p>
    <TextField
        required
        label="Capital Cost of PV" 
        variant="outlined" 
        value={formData.PVCost}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the replacement cost of PV modules per KW?</p>
    <TextField
        required
        label="Replacement Cost of PV" 
        variant="outlined" 
        value={formData.PVReplacementCost}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What are the operations and maintenance cost of PV modules per KW per year?</p>
    <TextField
        required
        label="O&M Cost of PV" 
        variant="outlined" 
        value={formData.PVOandM}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the lifetime of the PV modules?</p>
    <TextField
        required
        label="PV Lifetime" 
        variant="outlined" 
        value={formData.PVLifetime}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the efficiency of the PV modules?</p>
    <TextField
        required
        label="PV Efficiency" 
        variant="outlined" 
        value={formData.PVEfficiency}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    </form>
  );
};

export default PVQuestions;
