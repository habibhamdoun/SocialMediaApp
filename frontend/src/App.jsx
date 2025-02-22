import "./App.css";
import EmailOtpScreen from "./pages/EmailOtpScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material";
// import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <EmailOtpScreen /> */}
      {/* <Signup /> */}
      <Login />
    </ThemeProvider>
  );
}

export default App;
