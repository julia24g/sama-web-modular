import React from 'react';
import StandardField from '../field_components/FieldComponent';

const FlatRate = () => {
  return (
    <>
    <StandardField name="flatRate" label="Flat Price" defaultValue='' unit='$' />
    <p>Default flat rates based on input ZIP codes are provided via API integration; please review and adjust as necessary for more accurate results.</p>
    </>
  );
};

export default FlatRate;
