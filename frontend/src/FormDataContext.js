import React, { createContext, useContext, useReducer } from 'react';

// Define a context and provider for managing form data
const FormDataContext = createContext();

const initialState = {
    // General Data
    zipcode: ' ',
    systemType: ' ',
    typicalElectricalLoad: ' ',
    projectLifetime: '25',
    maxPowerSupplyLoss: '0.01%',
    minRenewableEnergy: '0.3',
    inflationRate: ' ',
    nominalDiscountRate: ' ',
    realDiscountRate: ' ',
    systemCapacity: '1269',
    annualTotalLoad: '',
    monthlyLoad1: '',
    monthlyLoad2: '',
    monthlyLoad3: '',
    monthlyLoad4: '',
    monthlyLoad5: '',
    monthlyLoad6: '',
    monthlyLoad7: '',
    monthlyLoad8: '',
    monthlyLoad9: '',
    monthlyLoad10: '',
    monthlyLoad11: '',
    monthlyLoad12: '',
    // PV
    PVCost: '896',
    PVReplacementCost: ' ',
    PVOandM: '0',
    fuelCostPerLiter: ' ',
    PVLifetime: '25',
    PVEfficiency: ' ',
    // WT
    WTCost: '',
    WTReplacementCost: '',
    WTOandM: '',
    WTLifetime: '',
    WTHubHeight: '17',
    WTAnemometerHeight: '43.6',
    WTElectricalEfficiency: '1',
    cutInSpeed: '2.5',
    cutOutSpeed: '25',
    ratedSpeed: '9.5',
    frictionCoefficient: '0.14',
    // Diesel Generator
    dieselGeneratorCost: '352',
    dieselGeneratorReplacementCost: '',
    dieselGeneratorOandM: '',
    dieselGeneratorLifetime: '',
    // Battery Bank
    batteryCost: '360',
    batteryChargerCost: '150',
    batteryReplacementConst: '',
    batteryOandM: '',
    batteryLifetime: '',
    batteryYearlyDegradation: '',
    minSOC: '0.2',
    maxSOC: '1',
    batteryVoltage: '',
    // Inverter
    inverterCost: '',
    inverterReplacementCost: '',
    inverterOandM: '',
    inverterLifetime: '25',
    inverterEfficiency: '',
    // Charge Controller
    chargeControllerCost: '',
    chargeControllerReplacementCost: '',
    chargeControllerOandM: '',
    superchargerLifetime: '',
    // Grid
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FORM_DATA':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const FormDataProvider = ({ children }) => {
    const [formData, dispatch] = useReducer(reducer, initialState);

    return (
        <FormDataContext.Provider value={{ formData, dispatch }}>
            {children}
        </FormDataContext.Provider>
    );
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.section]: {
                    ...state[action.section],
                    [action.field]: action.value,
                },
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

export const FormProvider = ({ children }) => {
    const [formData, dispatch] = useReducer(formReducer, initialState);

    return (
        <FormDataContext.Provider value={{ formData, dispatch }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useForm = () => {
    const context = useContext(FormDataContext);
    if (!context) {
        throw new Error('useForm must be used within a FormDataProvider');
    }
    return context;
};
