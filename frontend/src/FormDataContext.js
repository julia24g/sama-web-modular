import React, { createContext, useContext, useReducer } from 'react';

// Define a context and provider for managing form data
const FormDataContext = createContext();

const initialState = {
    // PSO Parameters
    maxIt: 200,
    nPop: 50,
    w: 1,
    wdamp: 0.99,
    c1: 2,
    c2: 2,
    Run_Time: 1,
    // Calendar
    n: '25',
    year: new Date().getFullYear(),
    // Irradiance definitions
    azimuth: 180,
    tilt: 34,
    soiling: 5,
    G_type: 1,
    // Temperature
    T_type: 1,
    // Grid
    Grid_escalation_rate: 2,
    // General Technical Data
    LPSP_max_rate: '0.0999999%',
    RE_min_rate: '0.75',
    // Rated Powers
    Ppv_r: 0.5,
    Pwt_r: 1,
    Cbt_r: 1,
    Cdg_3: 0.5,
    // PV
    fpv: 0.9,
    Tcof: -0.3,
    Tref: 25,
    Tc_noct: 45,
    Ta_noct: 20,
    G_noct: 800,
    gama: 0.9,
    Gref: 1000,
    L_PV: 25,
    n_PV: 0.2182,
    flatRateField1: '2500',
    // General Data
    zipcode: ' ',
    systemType: ' ',
    typicalElectricalLoad: ' ',
    e_ir_rate: '0.02',
    n_ir_rate: '0.055',
    ir: '0',
    RE_incentives_rate: 0.3,
    systemCapacity: '1269',
    // Load Data
    annualTotalLoad: '',
    isAnnual: true,
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
    // System Type Data
    PV: false,
    WT: false,
    dieselGenerator: false,
    batteryBank: false,
    // PV
    PVCost: '540',
    PVReplacementCost: '540',
    PVOandM: '29.49',
    fuelCostPerLiter: ' ',
    PVLifetime: '25',
    PVEfficiency: ' ',
    Installation_cost: 160,
    Overhead: 260,
    Sales_and_marketing: 400,
    Permiting_and_Inspection: 210,
    Electrical_BoS: 370,
    Structural_BoS: 160,
    Profit_costs: 340,
    Sales_tax: 80,
    // Diesel Generator
    C_DG: '240.45',
    R_DG: '240.45',
    C_fuel: 5.26,
    MO_DG: '0.064',
    C_fuel_adj_rate: 0.02,
    TL_DG: '24000',
    LR_DG: 0.25,
    a: 0.2730,
    b: 0.0330,
    // Battery Bank
    batteryCost: '460',
    batteryChargerCost: '150',
    batteryReplacementCost: '460',
    batteryOandM: '',
    L_B: '7.5',
    batteryYearlyDegradation: '',
    SOC_min: '0.2',
    SOC_max: '1',
    SOC_initial: 0.5,
    Q_lifetime: 8000,
    self_discharge_rate: 0,
    alfa_battery: 1,
    c: 0.403,
    k: 0.827,
    Imax: 16.7,
    Vnom: 12,
    ef_bat: 0.8,
    batteryVoltage: '',
    // Inverter
    C_I: 440,
    R_I: 440,
    inverterOandM: '',
    L_I: '25',
    inverterEfficiency: '0.96',
    DC_AC_ratio: 1.99,
    // Charge Controller
    C_CH: '149.99',
    R_CH: '149.99',
    MO_CH: '0',
    superchargerLifetime: '',
    // Grid
    gridConnected: true,
    netMetered: false
};

// Calculate 'ir' here based on the initialized 'n_ir_rate' and 'e_ir_rate'
initialState.ir = (parseFloat(initialState.n_ir_rate) - parseFloat(initialState.e_ir_rate)) / (1 + parseFloat(initialState.e_ir_rate));

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
