import './App.css';
import EmailOtpScreen from './pages/EmailOtpScreen';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material';
// import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <EmailOtpScreen />
    </ThemeProvider>
  );
}

export default App;
