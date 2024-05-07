import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
      primary: {
        main: '#4F2683',
      },
      secondary: {
        main: '#F1EAF9',
      },
    },
  });
  
  function CustomThemeProvider({ children }) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }
  
  export default CustomThemeProvider;