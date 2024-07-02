import React from 'react';
import StandardField from '../field_components/FieldComponent';

const PVQuestions = () => {

  const pvQuestionFields = [
    { question: 'What is the capital cost of PV modules per kW installed (all costs in)?', label: 'Capital Cost of PV', name: 'PVCost', defaultValue: '540', unit: '$' },
    { question: 'What is the replacement cost of PV modules per kW?', label: 'Replacement Cost of PV', name: 'PVReplacementCost', defaultValue: '540', unit: '$' },
    { question: 'What are the operations and maintenance cost of PV modules per kW per year?', label: 'O&M Cost of PV', name: 'PVOandM', defaultValue: '29.49', unit: '$' },
    { question: 'What is the lifetime of the PV modules?', label: 'PV Lifetime', name: 'PVLifetime', defaultValue: '25', unit: '' },
    { question: 'What is the tilt angle of the PV modules?', label: 'Tilt', name: 'tilt', defaultValue: '0', unit: '°' },
    { question: 'What is the azimuth angle of the PV modules?', label: 'Azimuth', name: 'azimuth', defaultValue: '180', unit: '°' }
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
