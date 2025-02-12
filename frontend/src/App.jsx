import './App.css';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material';
import Signup from './pages/Signup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Signup />
    </ThemeProvider>
  );
}

export default App;
