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
    <p>What is the capital cost of the diesel generator per KW installed (all costs in)?</p>
    <TextField
        required
        label="Capital Cost of DG" 
        variant="outlined" 
        value={formData.dieselGeneratorCost}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the replacement cost of the diesel generator per KW?</p>
    <TextField
        required
        label="Replacement Cost of DG" 
        variant="outlined" 
        value={formData.dieselGeneratorReplacementCost}
        onChange={handleAnswerChange}
        style={{width: "250px", margin: '10px auto'}}
    />
    <p>What is the operations and maintenance cost of the diesel generator per KW per year?</p>
    <TextField
        required
        label="O&M Cost of DG" 
        variant="outlined" 
        value={formData.dieselGeneratorOandM}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    <p>What is the lifetime of the diesel generator?</p>
    <TextField
        required
        label="DG Lifetime" 
        variant="outlined" 
        value={formData.dieselGeneratorLifetime}
        onChange={handleAnswerChange}
        style={{width: "210px", margin: '10px auto'}}
    />
    </form>
  );
};

export default DieselGenerator;
