import React from 'react';
import { TextField } from '@mui/material';
import './App.css';
import { useForm } from './FormDataContext'; // Import the useForm hook

const Zipcode = () => {
  const { formData, dispatch } = useForm(); // Use the useForm hook

  const handleAnswerChange = async (event) => {
    const { name, value } = event.target;
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        [name]: value,
      },
    });

    // Perform geocoding operation
    try {
      const response = await fetch(`http://localhost:5000/getUtilityRates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipcode: value }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch utility rates');
      }
      const data = await response.json();
      if (data.outputs) {
        const residentialRate = data.outputs.residential;
        dispatch({
          type: 'UPDATE_FORM_DATA',
          payload: {
            ...formData,
            flatRateField1: residentialRate,
          },
        });
      } else {
        console.log('No results found');
      }
    } catch (error) {
      console.error('Failed to fetch utility rates:', error);
    }
  };

  return (
    <form className="form">
      <TextField
        required
        label="Zipcode"
        variant="outlined"
        value={formData.zipcode}
        onChange={handleAnswerChange}
        style={{ width: "210px", margin: '10px auto' }}
      />
    </form>
  );
};

export default Zipcode;
