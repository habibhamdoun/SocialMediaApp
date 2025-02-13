import { Box } from '@mui/material';
import ResetPasswordOtp from '../components/userAuth/ResetPasswordOtp';

const ResetOtpScreen = () => {
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
      <ResetPasswordOtp />;
    </Box>
  );
};

export default ResetOtpScreen;
