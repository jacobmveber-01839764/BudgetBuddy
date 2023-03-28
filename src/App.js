import { createTheme, ThemeProvider } from '@material-ui/core';
import NavBar from './components/NavBar'
import './App.css';

const theme = createTheme({
  pallete: {
    primary: {
      
    },
    secondary: {

    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
  }
});

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
