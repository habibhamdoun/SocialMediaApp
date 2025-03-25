import "./App.css";
import EmailOtpScreen from "./pages/EmailOtpScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ResetOTPScreen from "./pages/ResetOTPScreen";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Email-Verification" element={<EmailOtpScreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Reset-Password" element={<ResetPassword />} />
          <Route path="/Reset-Password-OTP" element={<ResetOTPScreen />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
