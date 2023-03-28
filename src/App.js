import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme.js'
import NavBar from './components/NavBar'

import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar/>
      </ThemeProvider>
    </div>
  );
}

export default App;
