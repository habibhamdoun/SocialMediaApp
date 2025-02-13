import { Box } from '@mui/material';
import SignUpForm from '../components/userAuth/SignupForm';

const Signup = () => {
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
      <SignUpForm />
    </Box>
  );
};

export default Signup;
