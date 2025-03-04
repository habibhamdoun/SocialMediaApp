<<<<<<< HEAD
import "./App.css";
import EmailOtpScreen from "./pages/EmailOtpScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import Post from "./pages/Post";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from './pages/Login';
=======
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ResetOTPScreen from './pages/ResetOTPScreen';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmailOtpScreen from './pages/EmailOtpScreen';
>>>>>>> ad8b80f1378a7c5726e794751234e110a54a73a0


function App() {
  return (
    
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      {/* <EmailOtpScreen /> */}
      {/* <Signup /> */}
      <Login />
      <Router>
        <Routes>
          <Route path="/post" element= {<Post/>} />
        </Routes>
      </Router>
=======
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/Email-Verification' element={<EmailOtpScreen />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Reset-Password' element={<ResetPassword />} />
          <Route path='/Reset-Password-OTP' element={<ResetOTPScreen />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </BrowserRouter>
>>>>>>> ad8b80f1378a7c5726e794751234e110a54a73a0
    </ThemeProvider>
  );
}

export default App;
