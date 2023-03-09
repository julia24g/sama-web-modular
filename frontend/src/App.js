import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';
import axios from 'axios'

import './App.css';

function App() {
  const [loading, setLoading] = useState(false);   // Loading state of submit button, default set to false, onClick => set to true
  const [message, setMessage] = useState('');

  // For getting address
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  // Electrical data
  const [electricalLoad, setElectricalLoad] = useState('');

  // Advanced settings for researchers
  // TODO: Hide this in basic view
  const [PVCost, setPVCost] = useState('');
  const [dieselGeneratorCost, setDieselGeneratorCost] = useState('');
  const [batteryCost, setBatteryCost] = useState('');
  const [batteryChargerCost, setBatteryChargerCost] = useState('');
  const [utilityRates, setUtilityRates] = useState('');
  const [results, setResults] = useState('');

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    // Retrieve long/lat from address
    const geocoderURL = 'https://geocoding.geo.census.gov/geocoder/locations/address';

    // Clean up params

    // Make get request to Census Geocoder API (official US gov't provided API for address lookup)
    await axios.get(
      geocoderURL, 
      { 
        params: { 
          street: `${streetNumber} ${streetName}` ,
          city: city,
          state: state,
          zip: zipcode,
          benchmark: "Public_AR_Current", // most up to date database
          format: "json"
        }
      }
    ).then(response => {
        // Handle successful response
        console.log(response.data.result); 
        setLongitude(response.data.result.addressMatches[0].coordinates.x); // Set longitide
        setLatitude(response.data.result.addressMatches[0].coordinates.y); // Set latitude
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });

    // Perform PSO calculations
    await axios.get(
      'https://sama-web-app.uc.r.appspot.com/submit', 
      { 
        params: { longitude: longitude, latitude: latitude },
        responseType: 'application/json' // python flask send_file() returns an array buffer for the png image
      }
    ).then(response => {
      console.log("SUCCESS", response);
      setMessage('Here is your figure!');

      // set image src with base64 in API response
      document.getElementById("figure").src = `data:image/png;base64,${JSON.parse(response.data)["image"]}`;
      setResults(JSON.parse(response.data)["text"]);

      // Save user's location into database is successful
      axios.post(
        'https://sama-web-app.uc.r.appspot.com/locations',
        { longitude: longitude, latitude: latitude }
      ).then(
        console.log("Successfully added to database")
      ).catch(error => {
        console.log(error)
      });

    }).catch(error => {
      console.log(error);
    });

    // Update input form default values
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>SAMA Web Application</h1>
      <form>
        <TextField 
          id="outlined-basic" 
          label="Street Number" 
          variant="outlined" 
          value={streetNumber}
          onChange={(event)=>setStreetNumber(event.target.value)}
          style={{margin: '10px'}}
        />
        <TextField 
          id="outlined-basic" 
          label="Street Name" 
          variant="outlined" 
          value={streetName}
          onChange={(event)=>setStreetName(event.target.value)}  
          style={{margin: '10px'}}
        />
        <TextField 
          id="outlined-basic" 
          label="City" 
          variant="outlined" 
          value={city}
          onChange={(event)=>setCity(event.target.value)}  
          style={{margin: '10px'}}
        />
        <TextField 
          id="outlined-basic" 
          label="State" 
          variant="outlined" 
          value={state}
          onChange={(event)=>setState(event.target.value)}  
          style={{margin: '10px'}}
        />
        <TextField
          id="outlined-basic" 
          label="Zipcode" 
          variant="outlined" 
          value={zipcode}
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
          label="Cost of Battery Charger per KW" 
          variant="outlined" 
          value=''
          onChange={(event)=>setBatteryChargerCost(event.target.value)}
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
      <img id="figure"></img>
      <p>{results}</p>
    </div>
  );
}

export default App;
