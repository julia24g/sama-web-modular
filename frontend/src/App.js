import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';
import axios from 'axios'

import './App.css';

function App() {
  const [loading, setLoading] = useState(false);   // Loading state of submit button, default set to false, onClick => set to true
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [message, setMessage] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [electricalLoad, setElectricalLoad] = useState('');
  const [PVCost, setPVCost] = useState('');
  const [dieselGeneratorCost, setDieselGeneratorCost] = useState('');
  const [batteryCost, setBatteryCost] = useState('');
  const [superchargerCost, setSuperchargerCost] = useState('');
  const [utilityRates, setUtilityRates] = useState('');
  const [figure, setFigure] = useState('');

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    // Perform PSO calculations
    await axios.get(
      'http://localhost:5000/submit', 
      { params: { longitude: longitude, latitude: latitude }}
    ).then(response => {
      console.log("SUCCESS", response);
      setMessage('Here is your figure!');
      setFigure(Buffer.from(response.data, "base64").toString());
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
      <h1>SAMA Web Application</h1>
      <form>
        <TextField 
          id="outlined-basic" 
          label="Longitude" 
          variant="outlined" 
          value={longitude}
          onChange={(event)=>setLongitude(event.target.value)}
          style={{margin: '10px'}}
        />
        <TextField 
          id="outlined-basic" 
          label="Latitude" 
          variant="outlined" 
          value={latitude}
          onChange={(event)=>setLatitude(event.target.value)}  
          style={{margin: '10px'}}
        />
        <br></br>
        <TextField
          id="outlined-basic" 
          label="Zipcode" 
          variant="outlined" 
          value=''
          onChange={(event)=>setZipcode(event.target.value)}
          style={{margin: '10px'}}
        />
        <br></br>
        <TextField
          id="outlined-basic" 
          label="Average Electrical Load" 
          variant="outlined" 
          value=''
          onChange={(event)=>setElectricalLoad(event.target.value)}
          style={{margin: '10px'}}
        />
        <h3>System Specifications</h3>
        <TextField
          id="outlined-basic" 
          label="Cost of PV modules per KW" 
          variant="outlined" 
          value=''
          onChange={(event)=>setPVCost(event.target.value)}
          style={{margin: '10px'}}
        />
        <TextField
          id="outlined-basic" 
          label="Cost of Diesel Generator per KW" 
          variant="outlined" 
          value=''
          onChange={(event)=>setDieselGeneratorCost(event.target.value)}
          style={{margin: '10px'}}
        />
        <TextField
          id="outlined-basic" 
          label="Cost of Battery per KWh" 
          variant="outlined" 
          value=''
          onChange={(event)=>setBatteryCost(event.target.value)}
          style={{margin: '10px'}}
        />
        <TextField
          id="outlined-basic" 
          label="Cost of Supercharger per KW" 
          variant="outlined" 
          value=''
          onChange={(event)=>setSuperchargerCost(event.target.value)}
          style={{margin: '10px'}}
        />
        <TextField
          id="outlined-basic" 
          label="Utility Rates" 
          variant="outlined" 
          value=''
          onChange={(event)=>setUtilityRates(event.target.value)}
          style={{margin: '10px'}}
        />
        <br></br>
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="start"
          startIcon={<Search />}
          variant="outlined"
          type="submit"
          style={{margin: '10px'}}
        >
          Submit
        </LoadingButton>
      </form>
      <p>It can take up to 1 min to calculate your results.</p>
      <h2>{message}</h2>
      <p>{figure}</p>
      <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
        alt="Figure" height="auto" width="40%"></img>
    </div>
  );
}

export default App;
