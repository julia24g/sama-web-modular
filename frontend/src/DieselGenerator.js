import React from 'react';
import { TextField } from '@mui/material';
import './App.css';
import { useForm } from './FormDataContext'; // Import the useForm hook


const DieselGenerator = () => {
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
    <p>What is the capital cost of the diesel generator per kW installed (USD)?</p>
    <TextField
        required
        label="Capital Cost of DG" 
        variant="outlined" 
        value={formData.C_DG}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the replacement cost of the diesel generator per kW (USD)?</p>
    <TextField
        required
        label="Replacement Cost of DG" 
        variant="outlined" 
        value={formData.R_DG}
        onChange={handleAnswerChange}
        style={{width: "250px", margin: '10px auto'}}
    />
    <p>What is the operations and maintenance cost of the diesel generator per kW per year (USD)?</p>
    <TextField
        required
        label="O&M Cost of DG" 
        variant="outlined" 
        value={formData.MO_DG}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the lifetime of the diesel generator (hours)?</p>
    <TextField
        required
        label="DG Lifetime" 
        variant="outlined" 
        value={formData.TL_DG}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    </form>
  );
};

export default DieselGenerator;
