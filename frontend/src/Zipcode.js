import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import './style/App.css';

const Zipcode = () => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const watchedZipcode = watch("zipcode");

  useEffect(() => {
    if (watchedZipcode && watchedZipcode.length === 5) {
      const handleCheckZipcode = async () => {
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
              setValue('flatRate', residentialRate !== "no data" ? residentialRate : '');
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
      setValue('flatRate', '');
    }
  }, [watchedZipcode, setValue]);

  return (
    <div className="form">
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
