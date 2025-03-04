import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ResetOTPScreen from './pages/ResetOTPScreen';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmailOtpScreen from './pages/EmailOtpScreen';
import Post from './components/Post';


function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/Email-Verification' element={<EmailOtpScreen />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Reset-Password' element={<ResetPassword />} />
          <Route path='/Reset-Password-OTP' element={<ResetOTPScreen />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
          <Route path='/post' element={<Post />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
