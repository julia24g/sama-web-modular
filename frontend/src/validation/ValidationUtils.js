import * as yup from 'yup';

export const zipcodeValidation = yup.string()
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Must be a 5-digit zipcode')
    .required('This field is required');

export const createRateValidation = (rateStructureName) => {
    return yup.number()
        .typeError('Must be a number')
        .min(0, 'Must be a positive number')
        .when('rateStructure', (rateStructure, schema) => {
            return rateStructure === rateStructureName
                ? schema.required(`This field is required`)
                : schema;
        });
};

export const createMonthlyLoadValidation = yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be a positive number')
    .when('isAnnual', {
        is: false,
        then: schema => schema.required('This field is required'),
    })

export const createAnnualLoadValidation = yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be a positive number')
    .when('isAnnual', {
        is: true,
        then: schema => schema.required('This field is required'),
    })

export const percentageValidation = yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be between 0 and 100')
    .max(100, 'Must be between 0 and 100')
    .required('This field is required');

export const wholeNumberValidation = yup.number()
    .typeError('Must be a number')
    .integer('Must be a whole number')
    .min(0, 'Must be a positive number')

export const positiveNumberValidation = yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be a positive number')

export const timeRangeValidation = yup.object().shape({
    startTime: yup.number().required('Start time is required'), // Assuming startTime and endTime are numbers
    endTime: yup.number().required('End time is required')
        .test('is-after-start', 'End time must be after start time', function (value) {
            const { startTime } = this.parent;
            return startTime < value;
        }),
});

