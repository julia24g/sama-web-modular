import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import axios from 'axios';

const Zipcode = () => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const watchedZipcode = watch("zipcode");

  useEffect(() => {
    if (watchedZipcode && watchedZipcode.length === 5) {
      const handleCheckZipcode = async () => {

        try {
          const { data } = await axios.post('https://sama.eng.uwo.ca/api/getUtilityRates', { zipcode: watchedZipcode }, { withCredentials: true });
          
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

      handleCheckZipcode();
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
