import React from 'react';
import StandardField from '../field_components/FieldComponent';

const MonthlyRate = () => {
  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      {monthLabels.map((month, index) => (
        <StandardField name={`monthlyRate${index + 1}`} label={`${month} Price`} defaultValue='' unit='$' />
      ))}
    </div>
  );
};

export default MonthlyRate;
