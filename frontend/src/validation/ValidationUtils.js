import * as yup from 'yup';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

yup.addMethod(yup.number, 'noWhitespace', function () {
    return this.transform((value, originalValue) => 
        typeof originalValue === 'string' && /\s/.test(originalValue) ? NaN : value
    ).typeError('No whitespace allowed');
});

export const zipcodeValidation = yup
    .string()
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Must be a 5-digit zipcode')
    .test('is-valid-zipcode', 'Invalid zipcode', async (value) => {
        if (!value || value.length !== 5) return false;
        try {
            const { data } = await axios.post(`${apiBaseUrl}/validate_zipcode`, { zipcode: value });
            if (data.valid) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('ZIP code validation error:', error);
            return false;
        }
    })
    .required('This field is required');

export const createRateValidation = (rateStructureName) => {
    return yup.number()
        .typeError('Must be a number')
        .min(0, 'Must be a positive number')
        .when('rateStructure', (rateStructure, schema) => {
            return rateStructure === rateStructureName
                ? schema.required(`This field is required`)
                : schema;
        })
        .noWhitespace();;
};

export const createMonthlyLoadValidation = yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be a positive number')
    .when('isAnnual', {
        is: false,
        then: schema => schema.required('This field is required'),
    })
    .noWhitespace();

export const createAnnualLoadValidation = yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be a positive number')
    .when('isAnnual', {
        is: true,
        then: schema => schema.required('This field is required'),
    })
    .noWhitespace();

export const percentageValidation = yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be between 0 and 100')
    .max(100, 'Must be between 0 and 100')
    .required('This field is required')
    .noWhitespace();;

export const wholeNumberValidation = yup.number()
    .typeError('Must be a number')
    .integer('Must be a whole number')
    .min(0, 'Must be a positive number')
    .noWhitespace();

export const positiveNumberValidation = yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be a positive number')
    .noWhitespace();

export const timeRangeValidation = yup.object().shape({
    startTime: yup.number().required('Start time is required').noWhitespace(),
    endTime: yup.number().required('End time is required').noWhitespace()
        .test('is-after-start', 'End time must be after start time', function (value) {
            const { startTime } = this.parent;
            return startTime < value;
        }),
});

export const systemTypeValidation = yup.object().shape({
    photovoltaic: yup.boolean(),
    dieselGenerator: yup.boolean(),
    batteryBank: yup.boolean(),
}).test('at-least-one-true', 'At least one of the variables must be true', (values) => {
    return values.photovoltaic || values.dieselGenerator || values.batteryBank;
});

