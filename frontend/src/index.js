import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FormDataProvider } from './FormDataContext';

// Get a reference to the root DOM node
const container = document.getElementById('root');

// Create a root for the container
const root = createRoot(container); // Create a root.

// Use the root to render your component tree
root.render(
  <React.StrictMode>
    <FormDataProvider>
      <App />
    </FormDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
