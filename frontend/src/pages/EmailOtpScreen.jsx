import { Box } from '@mui/material';
import EmailVerificationOtp from '../components/userAuth/EmailVerificationOtp';

const EmailOtpScreen = () => {
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
      <EmailVerificationOtp />
    </Box>
  );
};

export default EmailOtpScreen;
