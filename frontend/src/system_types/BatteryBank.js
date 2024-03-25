import React from 'react';
import '../style/App.css';
import StandardField from '../field_components/FieldComponent';

const BatteryBank = () => {
  const batteryBankFields = [
    { question: 'What is the capital cost of the battery bank per kW installed (USD)?', label: 'Capital Cost of Battery', name: 'C_B', defaultValue: '460', unit: '$' },
    { question: 'What is the replacement cost of the battery bank per kW (USD)?', label: 'Replacement Cost of Battery', name: 'R_B', defaultValue: '460', unit: '$' },
    { question: 'What is the operations and maintenance cost of the battery bank per kW per year (USD)?', label: 'O&M Cost of Battery', name: 'batteryOandM', defaultValue: '0', unit: '$'},
    { question: 'What is the battery bank minimum state of charge (SOC)?', label: 'Minimum SOC', name: 'SOC_min', defaultValue: '0.2', unit: '' },
    { question: 'What is the battery bank maximum state of charge (SOC)?', label: 'Maximum SOC', name: 'SOC_max', defaultValue: '1', unit: '' },
  ];

  return (
    <div className="form">
      {batteryBankFields.map((field, index) => (
        <div key={index}>
          <p>{field.question}</p>
          <StandardField name={field.name} label={field.label} defaultValue={field.defaultValue} unit={field.unit} />
        </div>
      ))}
    </div>
  );
};

export default BatteryBank;
