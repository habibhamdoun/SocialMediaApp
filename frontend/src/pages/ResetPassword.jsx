import { Box } from '@mui/material';
import ResetPasswordForm from '../components/userAuth/ResetPasswordForm';

const ResetPassword = () => {
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
      <ResetPasswordForm />
    </Box>
  );
};

export default ResetPassword;
