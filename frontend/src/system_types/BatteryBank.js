import React from 'react';
import StandardField from '../field_components/FieldComponent';
import SelectOne from '../field_components/SelectOne';

const BatteryBank = () => {
  const batteryBankFields = [
    { question: 'What is the capital cost of the battery bank per kWh installed (USD)?', label: 'Capital Cost of Battery', name: 'C_B', defaultValue: '460', unit: '$' },
    { question: 'What is the replacement cost of the battery bank per kWh (USD)?', label: 'Replacement Cost of Battery', name: 'R_B', defaultValue: '460', unit: '$' },
    { question: 'What is the operations and maintenance cost of the battery bank per kWh per year (USD)?', label: 'O&M Cost of Battery', name: 'batteryOandM', defaultValue: '0', unit: '$' },
    { question: 'What is the battery bank minimum state of charge (SOC)?', label: 'Minimum SOC', name: 'SOC_min', defaultValue: '0.2', unit: '' },
    { question: 'What is the battery bank maximum state of charge (SOC)?', label: 'Maximum SOC', name: 'SOC_max', defaultValue: '1', unit: '' },
  ];

  return (
    <div className="form">
      <p>What type of battery does your system use?</p>
      <SelectOne name="isLithium" label1="Lithium Ion Battery" label2="Lead Acid Battery" />
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
