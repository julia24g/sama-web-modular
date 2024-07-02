import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const Zipcode = () => {
  const { watch, setValue, formState: { errors }, trigger, getValues } = useFormContext();
  var watchedZipcode = watch("zipcode");

  useEffect(() => {
    const validateAndRun = async () => {
      var isValid = await trigger("zipcode");
      if (isValid) {
        var { zipcode } = getValues();
        await fetchCoordinates(zipcode);
        var { latitude, longitude } = getValues();
        await fetchUtilityRates(latitude, longitude);
        setValue('tilt', latitude, { shouldTouch: true });
        // await fetchTilt(latitude, longitude);
        // await fetchAzimuth(latitude, longitude);
      }
    };

    if (watchedZipcode && watchedZipcode.length === 5) {
      validateAndRun();
    }
  }, [watchedZipcode, setValue, trigger, getValues]);

  const fetchCoordinates = async (zipcode) => {
    try {
      const { data } = await axios.post(`${apiBaseUrl}/validate_zipcode`, { zipcode }, { withCredentials: true });
      var { latitude, longitude, valid } = data;
      setValue('latitude', latitude);
      setValue('longitude', longitude);
    } catch (error) {
      console.error('Failed to fetch coordinates:', error);
    }
  }

  const fetchUtilityRates = async (latitude, longitude) => {
    try {
      var { data } = await axios.post(`${apiBaseUrl}/getUtilityRates`, { latitude, longitude }, { withCredentials: true });
      var residentialRate = data.outputs?.residential;
      if (residentialRate && residentialRate !== "no data") {
        setValue('flatRate', residentialRate, { shouldTouch: true });
      } else {
        setValue('flatRate', '', { shouldTouch: true });
        console.log('No results or invalid data found');
      }
    } catch (error) {
      console.error('Failed to fetch utility rates:', error);
    }
  };

  // const fetchTilt = async (latitude, longitude) => {
  //   try {
  //     var { data } = await axios.post(`${apiBaseUrl}/retrieveTilt`, { latitude, longitude }, { withCredentials: true });
  //     var tiltAngle = data.JAN;
  //     if (tiltAngle) {
  //       setValue('tilt', tiltAngle, { shouldTouch: true });
  //     } else {
  //       console.log('No results or invalid data found');
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch tilt angle values:', error);
  //   }
  // };

  // const fetchAzimuth = async (latitude, longitude) => {
  //   try {
  //     var { data } = await axios.post(`${apiBaseUrl}/retrieveAzimuth`, { latitude, longitude }, { withCredentials: true });
  //     var azimuthAngle = data.azimuth;
  //     if (azimuthAngle) {
  //       setValue('azimuth', azimuthAngle, { shouldTouch: true });
  //     } else {
  //       console.log('No results or invalid data found');
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch azimuth angle values:', error);
  //   }
  // };

  return (
    <div className="form">
      <p>Get started by entering your ZIP code.</p>
      <Controller
        name="zipcode"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Zipcode"
            variant="outlined"
            style={{ width: "210px", margin: '10px auto' }}
            error={!!errors.zipcode}
            helperText={errors.zipcode ? errors.zipcode.message : null}
          />
        )}
      />
    </div>
  );
};

export default Zipcode;
