import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';
import axios from 'axios'

import './App.css';

function App() {

  // Function to set the loading state of the submit button
  // Default set to false, onClick => set to true
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    // Perform PSO calculations
    await axios.get(
      'http://localhost:5000/submit', 
      { params: { longitude: longitude, latitude: latitude }}
    ).then(response => {
      console.log("SUCCESS", response)
      setMessage(`Hello ${response.data.result}!`)
    }).catch(error => {
      console.log(error)
    });

    // Save user's location into database
    axios.post(
      'http://localhost:5000/locations',
      { longitude: longitude, latitude: latitude }
    ).then(response => {
      console.log("SUCCESS", response)
    }).catch(error => {
      console.log(error)
    });
  
    // Update input form default values
    setLongitude('');
    setLatitude('');
    setLoading(false);
  };

  return (
    <div className="App">
      <form>
        <TextField 
          id="outlined-basic" 
          label="Longitude" 
          variant="outlined" 
          value={longitude}
          onChange={(event)=>setLongitude(event.target.value)}
        />
        <TextField 
          id="outlined-basic" 
          label="Latitude" 
          variant="outlined" 
          value={latitude}
          onChange={(event)=>setLatitude(event.target.value)}  
        />
        <br></br>
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="start"
          startIcon={<Search />}
          variant="outlined"
          type="submit"
        >
          Submit
        </LoadingButton>
      </form>
      <p>It can take up to 1 min to calculate your results.</p>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
