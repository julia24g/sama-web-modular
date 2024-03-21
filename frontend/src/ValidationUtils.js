import * as yup from 'yup';

export const createZipcodeValidation = () => {
    return yup.string()
        .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Must be a 5-digit zipcode')
        .required('This field is required');
}

// Reusable function to create validation schema for rate fields
export const createRateValidation = (rateStructureName) => {
    return yup.number()
        .typeError('Must be a number')
        .when('rateStructure', (rateStructure, schema) => {
            return rateStructure === rateStructureName
                ? schema.required(`This field is required`)
                : schema;
        });
};

export const createMonthlyLoadValidation = () => {
    return yup.number()
        .typeError('Must be a number')
        .when('isAnnual', {
            is: false, // Check if isAnnual is false
            then: schema => schema.required('This field is required'), // Only make monthlyLoad required if isAnnual is false
            otherwise: schema => schema,
        })
};

export const createAnnualLoadValidation = () => {
    return yup.number()
        .typeError('Must be a number')
        .when('isAnnual', {
            is: true, // Check if isAnnual is true
            then: schema => schema.required('This field is required'), // Only make annualLoad required if isAnnual is true
            otherwise: schema => schema,
        })
}

