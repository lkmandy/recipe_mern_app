// Application entry point. Wraps the app in the required context providers before mounting to the DOM.
// Provider order matters: BrowserRouter must be outermost so routing works inside AuthProvider and ChakraProvider.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Custom Chakra UI theme — overrides the default colour palette and font to match the Nyama brand.
const theme = extendTheme({
  colors: {
    brand: {
      50:  '#FEF0EA',
      100: '#FDD9CC',
      200: '#F5C4B3',
      300: '#F0997B',
      400: '#E8440A',
      500: '#E8440A',
      600: '#C0380A',
      700: '#993C1D',
      800: '#712B13',
      900: '#4A1B0C',
    },
  },
  fonts: {
    heading: `'Inter', Arial, sans-serif`,
    body:    `'Inter', Arial, sans-serif`,
  },
  components: {
    Button: { defaultProps: { colorScheme: 'brand' } },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);