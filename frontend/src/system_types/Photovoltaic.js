import React, { useEffect } from 'react';
import StandardField from '../field_components/FieldComponent';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const PVQuestions = () => {

  var defaultTilt = 0;
  var defaultAzimuth = 0;

  const { watch, setValue } = useFormContext();
  const watchedZipcode = watch("zipcode");

  useEffect(() => {
    if (watchedZipcode && watchedZipcode.length === 5) {
      const handleTiltCalculation= async () => {
        try {
          const { data } = await axios.post(`${apiBaseUrl}/retrieveTilt`, { zipcode: watchedZipcode }, { withCredentials: true });

          const tiltAngle = data.JAN;
          if (tiltAngle) {
            setValue('tilt', tiltAngle, { shouldTouch: true });
            defaultTilt = tiltAngle;
          } else {
            console.log('No results or invalid data found');
          }
        } catch (error) {
          console.error('Failed to fetch tilt angle values:', error);
        }
      };
      const handleAzimuthCalculation= async () => {
        try {
          const { data } = await axios.post(`${apiBaseUrl}/retrieveAzimuth`, { zipcode: watchedZipcode }, { withCredentials: true });

          const azimuthAngle = data.azimuth;
          console.log(data);
          if (azimuthAngle) {
            setValue('azimuth', azimuthAngle, { shouldTouch: true });
            defaultAzimuth = azimuthAngle;
          } else {
            console.log('No results or invalid data found');
          }
        } catch (error) {
          console.error('Failed to fetch azimuth angle values:', error);
        }
      };
      handleTiltCalculation();
      handleAzimuthCalculation();
    }
  }, [watchedZipcode, setValue]);

  const pvQuestionFields = [
    { question: 'What is the capital cost of PV modules per kW installed (all costs in)?', label: 'Capital Cost of PV', name: 'PVCost', defaultValue: '540', unit: '$' },
    { question: 'What is the replacement cost of PV modules per kW?', label: 'Replacement Cost of PV', name: 'PVReplacementCost', defaultValue: '540', unit: '$' },
    { question: 'What are the operations and maintenance cost of PV modules per kW per year?', label: 'O&M Cost of PV', name: 'PVOandM', defaultValue: '29.49', unit: '$' },
    { question: 'What is the lifetime of the PV modules?', label: 'PV Lifetime', name: 'PVLifetime', defaultValue: '25', unit: '' },
    { question: 'What is the tilt angle of the PV modules?', label: 'Tilt', name: 'tilt', defaultValue: defaultTilt, unit: '°' },
    { question: 'What is the azimuth angle of the PV modules?', label: 'Azimuth', name: 'azimuth', defaultValue: defaultAzimuth, unit: '°' }
  ];

  return (
    <div className="form">
      {pvQuestionFields.map((field, index) => (
        <div key={index}>
          <p>{field.question}</p>
          <StandardField name={field.name} label={field.label} defaultValue={field.defaultValue} unit={field.unit} />
        </div>
      ))}
    </div>
  );
};

export default PVQuestions;
