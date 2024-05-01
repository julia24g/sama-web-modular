import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const Zipcode = () => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const watchedZipcode = watch("zipcode");

  useEffect(() => {
    if (watchedZipcode && watchedZipcode.length === 5) {
      const handleZipcodeRateMatching = async () => {

        try {
          const { data } = await axios.post(`${apiBaseUrl}/getUtilityRates`, { zipcode: watchedZipcode }, { withCredentials: true });

          const residentialRate = data.outputs?.residential;
          if (residentialRate && residentialRate !== "no data") {
            setValue('flatRate', residentialRate, { shouldTouch: true });
          } else {
            console.log('No results or invalid data found');
          }
        } catch (error) {
          console.error('Failed to fetch utility rates:', error);
        }
      };

      // const handleZipcodeLoadMatching = async () => {
      //   try {
      //     // get state and city
      //     // if not valid or not found file, set load_type to 8
      //     setValue("foundLoad", false);

      //   } catch (error) {
      //     console.error('Failed to check zipcode state and city: ', error);
      //   }
      // };
      // handleZipcodeLoadMatching();
      handleZipcodeRateMatching();
    } else {
      setValue('flatRate', '');
    }
  }, [watchedZipcode, setValue]);

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
