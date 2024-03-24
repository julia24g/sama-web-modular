import React from 'react';
import StandardField from '../field_components/FieldComponent';

const FlatRate = () => {
  return (
    <StandardField name="flatRate" label="Flat Price" defaultValue='' unit='$' />
  );
};

export default FlatRate;
