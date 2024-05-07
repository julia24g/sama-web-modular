import React from 'react';
import StandardField from '../field_components/FieldComponent';

const SeasonalRate = () => {

  return (
    <>
      <StandardField name="seasonalRateField1" label="Summer Price" defaultValue='' unit='$' />
      <StandardField name="seasonalRateField2" label="Winter Price" defaultValue='' unit='$' />
    </>
  );
};

export default SeasonalRate;
