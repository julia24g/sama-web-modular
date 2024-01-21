import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Nav bar
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import axios from 'axios'

import './App.css';
import stateRegionData from './state-regions.json'
import states from './states.json'


function App() {
    const [loading, setLoading] = useState(false);   // Loading state of submit button, default set to false, onClick => set to true
    const [message, setMessage] = useState('');
    const [results, setResults] = useState('');

    // For getting address
    // const [state, setState] = useState('');
    // const [region, setRegion] = useState('');
    const [zipcode, setZipcode] = useState('');
    // const [regions, displayRegions] = useState([]);

    // Advanced settings 
    // TODO: Hide this in basic view
    const [systemCapacity, setSystemCapacity] = useState('1269'); // Set defualt system capacity = national average kwh (11,000) * 1000 / 8760 hours 
    const [PVCost, setPVCost] = useState('896');
    const [dieselGeneratorCost, setDieselGeneratorCost] = useState('352');
    const [batteryCost, setBatteryCost] = useState('360');
    const [batteryChargerCost, setBatteryChargerCost] = useState('150');


    async function handleSubmit(event){
        setLoading(true); // Set the submit button to loading state
        event.preventDefault();

        // PSO API configs
        // const url = 'http://localhost:5000/submit'; // Uncomment for local development
        const url = 'https://backend-dot-sama-web-app.uc.r.appspot.com/submit'; // Comment out during local development

        // Set up config for GET request
        let config = { 
            params: { 
                zipcode: zipcode,
                // state: state,
                // region: region,
                pv_cost: PVCost,
                diesel_generator_cost: dieselGeneratorCost,
                battery_cost: batteryCost,
                battery_charger_cost: batteryChargerCost
            },
            responseType: 'application/json' // python flask send_file() returns an array buffer for the png image
        };

        // Verify inputs
        if (zipcode === '') {
            setMessage('Please enter a valid zipcode.');
            setLoading(false);
            return;
        }

        // if (state === '') {
        //     setMessage('Please select your state.');
        //     setLoading(false);
        //     return;
        // }

        // if (region === ''){
        //     setMessage('Please select your region.');
        //     setLoading(false);
        //     return;
        // }

        await axios.get(url, config)
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
                // Display error message
                if (error.response) {
                    setMessage(error.response.data);
                } else {    
                    setMessage("Error accessing backend. Please try again later.");
                }
                // Set results to empty
                setResults('');
                document.getElementById("figure").src = '';
                setLoading(false); // Stop loading
            });
    };

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1, boxShadow: 3 }} className="navBar">
                <AppBar position="static" color='default'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: "#4F2683", fontWeight:"800"}} >
                    SAMA
                    </Typography>
                    <Link href="#calculator" underline="none" color="inherit"><Button color="inherit" className="navButton">Calculator</Button></Link>
                    <Link href="#about" underline="none" color="inherit"><Button color="inherit" className="navButton">About</Button></Link>
                    <Link href="#contact" underline="none" color="inherit"><Button color="inherit" className="navButton">Contact</Button></Link>
                </Toolbar>
                </AppBar>
            </Box>

            <Box className="landingPage">
                <div className="landingText">
                    <h1>WELCOME TO SAMA!</h1>
                    <br></br>
                    <p>Sama is the first-ever publicly available tool to help you calculate the cost of switching to off-grid solar photvoltaic (PV) systems.</p>
                    <p>Learn how you can go green today.</p>
                    <br></br>
                    <Link href="#calculator" underline="none" color="inherit    ">
                    <Button variant="contained" size="large" sx={{ backgroundColor:"#4F2683", color: "white", fontWeight: "600" }}>Get Started →</Button>
                    </Link>
                </div>
            </Box>

            <Box id="calculator" sx={{ padding: "100px" }}>
                <h1>SAMA CALCULATOR</h1>
                <p>Get started by entering your zipcode.</p>
                <p>This application currently only supports US locations.</p>
                <br></br>
                <form className="form">
                    <TextField
                        required
                        label="Zipcode" 
                        variant="outlined" 
                        value={zipcode}
                        onChange={(event)=>setZipcode(event.target.value)}
                        style={{width: "210px", margin: '10px auto'}}
                    />
                    {/* <Autocomplete
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
                        style={{width: "210px", margin: '10px auto'}}
                    />
                    <Autocomplete
                        id="regions_field"
                        disablePortal
                        label="Region"
                        options={regions}
                        renderInput={(params) => <TextField {...params} required label="Region" />}
                        onChange={(event, value)=>setRegion(value)}
                        style={{width: "210px", margin: '10px auto'}}
                    /> */}
                    <br></br>
                    <Accordion sx={{ marginInline: "10%" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography sx={{fontWeight: "500"}}>Advanced System Specification</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{textAlign:"left", textStyle: "italic"}}>
                                Default values are specified. 
                                Advanced users may use custom values to fine-tune the parameters for a more accurate result.
                            </Typography>
                            <br></br>
                            <TextField
                                label="System Capacity" 
                                variant="outlined" 
                                value={systemCapacity}
                                onChange={(event)=>setSystemCapacity(event.target.value)}
                                style={{margin: '10px'}}
                            />
                            <TextField
                                label="Cost of PV modules per KW" 
                                variant="outlined" 
                                value={PVCost}
                                onChange={(event)=>setPVCost(event.target.value)}
                                style={{margin: '10px'}}
                            />
                            <TextField
                                id="outlined-basic" 
                                label="Cost of Diesel Generator per KW" 
                                variant="outlined" 
                                value={dieselGeneratorCost}
                                onChange={(event)=>setDieselGeneratorCost(event.target.value)}
                                style={{margin: '10px'}}
                            />
                            <TextField
                                label="Cost of Battery per KWh" 
                                variant="outlined" 
                                value={batteryCost}
                                onChange={(event)=>setBatteryCost(event.target.value)}
                                style={{margin: '10px'}}
                            />
                            <TextField
                                label="Cost of Battery Charger per KW" 
                                variant="outlined" 
                                value={batteryChargerCost}
                                onChange={(event)=>setBatteryChargerCost(event.target.value)}
                                style={{margin: '10px'}}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <br></br>
                    <p style={{ fontStyle: "italic" }}>It can take up to 1 min to calculate your results.</p>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<Search />}
                        variant="contained"
                        type="submit"
                        style={{margin: '10px'}}
                        sx={{ backgroundColor:"#4F2683", color: "white", fontWeight: "600" }}
                    >
                    Submit
                    </LoadingButton>
                </form>
                <br></br>
                <h2>{message}</h2>
                <img id="figure" style={{ width: "100%" }}></img>
                <p>{results}</p>
            </Box>

            <Box id="about">
                <div className="aboutText">
                    <h1>ABOUT</h1>
                    <br></br>
                    <p>SAMA is the world's first-ever publicly available web tool to help homeowners calculate the cost of building and maintaining an off-grid solar PV system.</p>
                    <br></br>
                    <br></br>
                    <p>Our goal is to make information about solar PV systems more accessible to the general public. 
                        By providing a simple tool to assist homeowners with understanding the associated costs of generating their own electrical power, 
                        we aim to encourage more people to switch to greener energy alternatives.</p>
                    <br></br>
                    <br></br>
                    <p>SAMA was developed by Seyyed Ali Sadat and Elaine Liu, members of the Free Appropriate Sustainability Technology 
                        (FAST) research group at Western University in London, ON, Canada led by Dr. Joshua Pearce.</p>
                    <br></br>
                </div>
            </Box>

            <Box id="contact">
                <div className="contactText">
                    <h1>CONTACT</h1>
                    <br></br>
                    <h2>Dr. Joshua Pearce</h2>
                    <p>John M. Thompson Chair in Information Technology and Innovation,</p>
                    <p>Thompson Centre for Engineering Leadership & Innovation</p>
                    <p>Western University</p>
                    <p>joshua.pearce@uwo.ca</p>
                    <br></br>
                    <br></br>
                    <h2>Seyyed Ali Sadat</h2>
                    <p>Researcher, FAST Lab</p>
                    <p>Western University</p>
                    <p>ssadat6@uwo.ca</p>
                    <br></br>
                </div>
            </Box>

            <div id="footer">
                    <h3>Western University</h3>
                    <p>1151 Richmond St.</p>
                    <p>London, Ontario, Canada</p>
                    <p>N6A 3K7</p>
            </div>                
            

        </div>
      );
}

export default App;