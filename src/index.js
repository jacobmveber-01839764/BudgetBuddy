import React from 'react';
import { createRoot }  from 'react-dom/client';
import reportWebVitals from './utils/reportWebVitals';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './assets/theme.js'
import './styles.css';

import Main from './Main.js'

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Main/>
        </ThemeProvider>
      </div>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const root = createRoot(document.getElementById("root"));
root.render(<App />);