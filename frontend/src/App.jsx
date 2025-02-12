import './App.css';
import Button from '@mui/material/Button';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button variant='outlined'>Button</Button>
        <br />
        <br />
        <Button variant='fill'>Button</Button>
      </ThemeProvider>
    </>
  );
}

export default App;
