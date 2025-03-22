import "./App.css";
import EmailOtpScreen from "./pages/EmailOtpScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import Post from "./pages/Post";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from './pages/Login';


function App() {
  return (
    
    <ThemeProvider theme={theme}>
    <Router>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;
