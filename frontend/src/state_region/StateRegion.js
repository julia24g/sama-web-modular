import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import stateRegionData from './state-regions.json';
import states from './states.json';

const StateRegion = () => {
    const { control, setValue, getValues } = useFormContext();
    const [regions, setRegions] = useState([]);

    const handleStateChange = (event, value) => {
        setValue('state', value);
        const newRegions = value ? stateRegionData[value].sort() : [];
        setRegions(newRegions);
        setValue('region', '');
    };

    const handleRegionChange = (event, value) => {
        setValue('region', value);
    };

    return (
        <>
        <p>Please provide your state and region.</p>
            <Controller
                name="state"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        disablePortal
                        options={states}
                        getOptionLabel={(option) => option}
                        onChange={handleStateChange}
                        renderInput={(params) => <TextField {...params} required label="State" />}
                        style={{ width: '210px', margin: '10px auto' }}
                    />
                )}
            />

            <Controller
                name="region"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        disablePortal
                        options={regions}
                        getOptionLabel={(option) => option}
                        onChange={handleRegionChange}
                        renderInput={(params) => <TextField {...params} required label="Region" />}
                        style={{ width: '210px', margin: '10px auto' }}
                    />
                )}
            />
        </>
    );
};

export default StateRegion;
