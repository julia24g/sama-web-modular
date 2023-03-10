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


    async function handleSubmit(event){
        setLoading(true); // Set the submit button to loading state
        event.preventDefault();

        // retrieve longitude and latitude from geocoder API is successful
        const geocoderURL = 'https://geocoding.geo.census.gov/geocoder/locations/address';

        // Set config for geocoder API
        let config = {
          params: { 
            street: `${streetNumber} ${streetName}` ,
            city: city,
            state: state,
            zip: zipcode,
            benchmark: "Public_AR_Current", // most up to date database
            format: "json"
          }
        };
        
        // Promise chaining: start with making GET request to geocoder API
        await axios.get(geocoderURL,config)
            .then(response => {
                // Get the longitude and latitude from response
                let longitude = response.data.result.addressMatches[0].coordinates.x;
                let latitude = response.data.result.addressMatches[0].coordinates.y;

                // Set longitude and latitude for later use
                setLongitude(longitude);
                setLatitude(latitude);
                
                // Return coordinates for use in next Promise
                return [longitude, latitude];
            })
            .catch(error => {
                console.error(error);
                setMessage("Error finding address. Please double check your input. Otherwise, the app does not currently support your location.")
            })
            .then(coordinates => {
                // Perform PSO calculations
                // const url = 'http://localhost:5000/submit'; // Uncomment for local development
                const url = 'https://backend-dot-sama-web-app.uc.r.appspot.com/submit'; // Comment out during local development
                
                // Set up config for GET request
                let config = { 
                    params: { longitude: coordinates[0], latitude: coordinates[1] },
                    responseType: 'application/json' // python flask send_file() returns an array buffer for the png image
                };
                
                return axios.get(url, config);
            })
            .catch(error => {
                console.log(error);
                setMessage("Error performing calculations. Please try again later.");
            })
            .then(response => {
                setMessage('Here is your figure!');
                        
                // set image src with base64 in API response
                document.getElementById("figure").src = `data:image/png;base64,${JSON.parse(response.data)["image"]}`;
                setResults(JSON.parse(response.data)["text"]);
                
                return;    
            })
            .catch(error => {
                console.log(error);
                setMessage("Error displaying figure");
            })
            .then(function() {
                // const url = 'http://localhost:5000/locations'; // Uncomment for local development
                const url = 'https://backend-dot-sama-web-app.uc.r.appspot.com/locations'; // Comment out during local development

                // Set config for POST request to store user location in database
                let config = { longitude: longitude, latitude: latitude };

                return axios.post(url, config);
            });

        // Stop the submit button from spinning
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