import { Box } from '@mui/material';
import LoginForm from '../components/userAuth/LoginForm';

const Login = () => {
  return (
    <Box
      sx={{
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default Login;
