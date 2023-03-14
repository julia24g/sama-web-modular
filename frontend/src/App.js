import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
// import Select from '@mui/material/Select';

import axios from 'axios'

import './App.css';
import stateRegionData from './state-regions.json'
import states from './states.json'

function App() {
    const [loading, setLoading] = useState(false);   // Loading state of submit button, default set to false, onClick => set to true
    const [message, setMessage] = useState('');

    // For getting address
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [state, setState] = useState('');
    const [region, setRegion] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [regions, displayRegions] = useState([]);

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

        // Import the Secret Manager client and instantiate it:
        const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
        const client = new SecretManagerServiceClient();

        // Build path
        let project_id = "sama-web-app"
        let secret_id = "OPENCAGE_DATA_API_KEY"
        let version = 1
        let name = client.secretVersionPath(project_id, secret_id, version)

        // Access the API key
        let accessResponse = await client.accessSecretVersion({name: name});
        let apiKey = accessResponse.payload.data.toString('utf8');




        // Promise chaining: start with making GET request to Google Secret Manager to retrieve the API key
        await client.accessSecretVersion({name: name})
            .then(response => {
                let apiKey = response.payload.data.toString('utf8');

                // Open Cage Data API to retrieve long/lat from zipcode
                const geoURL = "https://api.opencagedata.com/geocode/v1/json";

                let config = {
                    params: {
                        q: `${zipcode},USA`,
                        language: 'en',
                        key: apiKey
                    }
                };

                return axios.get(geoURL,config);
            })
            .then(response => {
                // Get the longitude and latitude from response
                let longitude = response.data.results[0].geometry.lng;
                let latitude = response.data.results[0].geometry.lat;

                // Set longitude and latitude for later use
                setLongitude(longitude);
                setLatitude(latitude);
                
                // Return coordinates for use in next Promise
                return [longitude, latitude];
            })
            .catch(error => {
                console.error(error);
                setMessage("Error finding address. Please double check your input. Otherwise, the app does not currently support your location.");
                setLoading(false);
            })
            .then(coordinates => {
                // Perform PSO calculations
                const url = 'http://localhost:5000/submit'; // Uncomment for local development
                // const url = 'https://backend-dot-sama-web-app.uc.r.appspot.com/submit'; // Comment out during local development

                // Set up config for GET request
                let config = { 
                    params: { 
                        longitude: coordinates[0], 
                        latitude: coordinates[1],
                        state: state,
                        region: region
                    },
                    responseType: 'application/json' // python flask send_file() returns an array buffer for the png image
                };

                
                return axios.get(url, config);
            })
            .catch(error => {
                console.log(error);
                setMessage("Error performing calculations. Please try again later.");
                setLoading(false);
            })
            .then(response => {
                setMessage('Here is your figure!');
                        
                // set image src with base64 in API response
                document.getElementById("figure").src = `data:image/png;base64,${JSON.parse(response.data)["image"]}`;
                
                // format the output text results and display as a list 
                let data = JSON.parse(response.data)["text"];
                let arr = [];
                Object.keys(data).forEach(function(key) {
                  arr.push([key, data[key][0], data[key][1]]);
                });
                console.log(data);
                setResults(
                    <p>
                        {arr.map(item => <li>{item[0] + ": " + item[1] + " " + item[2]}</li>)}
                    </p>
                );
                
                // stop the loading on submit button
                setLoading(false);
                return;    
            })
            .catch(error => {
                console.log(error);
                setMessage("Error displaying figure");
                setLoading(false);
            })
            .then(function() {
                const url = 'http://localhost:5000/locations'; // Uncomment for local development
                // const url = 'https://backend-dot-sama-web-app.uc.r.appspot.com/locations'; // Comment out during local development

                // Set config for POST request to store user location in database
                let config = { longitude: longitude, latitude: latitude };

                return axios.post(url, config);
            }).catch(error => {
                setLoading(false);
            });
    };

    return (
        <div className="App">
            <h1>SAMA Web Application</h1>
            <p>
                Welcome! This tool will help you determine the cost effectiveness of switching to solar PV energy systems.
            </p>
            <p>
                To get started, enter in the zipcode of your location.      
            </p>
            <form>
                <TextField
                    required
                    label="Zipcode" 
                    variant="outlined" 
                    value={zipcode}
                    onChange={(event)=>setZipcode(event.target.value)}
                    style={{margin: '10px'}}
                />
                <Autocomplete
                    disablePortal
                    label="State"
                    options={states}
                    renderInput={(params) => <TextField {...params} required label="State"/>}
                    onChange={
                        (event, value)=>{
                            setState(value);
                            displayRegions(stateRegionData[value].sort());
                        }
                    }
                    style={{width: "210px", margin: 'auto', padding: "10px"}}
                />
                <Autocomplete
                    id="regions_field"
                    disablePortal
                    label="Region"
                    options={regions}
                    renderInput={(params) => <TextField {...params} required label="Region" />}
                    onChange={(event, value)=>setRegion(value)}
                    style={{width: "210px",margin: 'auto', padding: "10px"}}
                />
                <br></br>
                <h2>For researchers and advanced users:</h2>
                <p>Enter in additional parameters to fine tune your calculations.</p>
                <h3>System Specifications (Optional)</h3>
                <TextField
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
                    label="Cost of Battery per KWh" 
                    variant="outlined" 
                    value=''
                    onChange={(event)=>setBatteryCost(event.target.value)}
                    style={{margin: '10px'}}
                />
                <TextField
                    label="Cost of Battery Charger per KW" 
                    variant="outlined" 
                    value=''
                    onChange={(event)=>setBatteryChargerCost(event.target.value)}
                    style={{margin: '10px'}}
                />
                <TextField
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