import React from 'react';
import StandardField from '../field_components/FieldComponent';

const DieselGenerator = () => {
  const dieselGeneratorFields = [
    { question: 'What is the capital cost of the diesel generator per kW installed (USD)?', label: 'Capital Cost of DG', name: 'C_DG', defaultValue: '240.45', unit: '$' },
    { question: 'What is the replacement cost of the diesel generator per kW (USD)?', label: 'Replacement Cost of DG', name: 'R_DG', defaultValue: '240.45', unit: '$' },
    { question: 'What is the operations and maintenance cost of the diesel generator per kW per year (USD)?', label: 'O&M Cost of DG', name: 'MO_DG', defaultValue: '0.064', unit: '$' },
    { question: 'What is the lifetime of the diesel generator (hours)?', label: 'DG Lifetime', name: 'TL_DG', defaultValue: '24000', unit: '' },
  ];

  return (
    <div className="form">
      {dieselGeneratorFields.map((field, index) => (
        <div key={index}>
          <p>{field.question}</p>
          <StandardField name={field.name} label={field.label} defaultValue={field.defaultValue} unit={field.unit} />
        </div>
      ))}
    </div>
  );
};

export default DieselGenerator;
