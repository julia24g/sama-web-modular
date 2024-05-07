import React from 'react';

const CalculatorTabContext = React.createContext();

const CalculatorTabProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = React.useState('1');

    return (
        <CalculatorTabContext.Provider value={{ selectedTab, setSelectedTab }}>
            {children}
        </CalculatorTabContext.Provider>
    );
}

export { CalculatorTabContext, CalculatorTabProvider };
