import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ActuarialSetup from './lib';
import './index.css';

// Create a custom theme using Material-UI's createTheme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#337d9e'
    }
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: '#337d9e'
        }
      }
    },
    MuiTypography: {
      root: {
        // Apply a simple color without referencing theme
        color: 'black' // You can set a default color here
      }
    }
  }
});

// Create a history object for routing
const history = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This resets and normalizes CSS */}
      <Router history={history}>
        {/* Route to render the ActuarialSetup component */}
        <Route path="/" component={ActuarialSetup} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
