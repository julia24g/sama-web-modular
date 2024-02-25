import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import './App.css';
import * as yup from 'yup';

const schema = yup.object().shape({
  zipcode: yup
    .string()
    .required('Zipcode is required')
    .matches(/^\d{5}$/, 'Zipcode must be a 5-digit number'),
});

const Zipcode = () => {
  const { control, watch, setValue, formState: { errors } } = useFormContext(); // Use the useFormContext hook
  const watchedZipcode = watch("zipcode"); // This will watch the zipcode field in real-time

  useEffect(() => {
    if (watchedZipcode && watchedZipcode.length === 5) {
      const handleCheckZipcode = async () => {
        // Perform geocoding operation
        try {
          const response = await fetch(`http://127.0.0.1:5000/getUtilityRates`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zipcode: watchedZipcode }),
          });
          if (!response.ok) {
            throw new Error('Failed to fetch utility rates');
          }
          const data = await response.json();
          if (data.outputs) {
            const residentialRate = data.outputs.residential;
            if (residentialRate != "no data") {
              setValue('flatRateField1', residentialRate !== "no data" ? residentialRate : '');
            }
          } else {
            console.log('No results found');
          }
        } catch (error) {
          console.error('Failed to fetch utility rates:', error);
        }
      };

      handleCheckZipcode();
    } else {
      setValue('flatRateField1', '');
    }
  }, [watchedZipcode, setValue]); // useEffect will run when watchedZipcode changes

  return (
    <div className="form">
      <Controller
        name="zipcode"
        control={control}
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
