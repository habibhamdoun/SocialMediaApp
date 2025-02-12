import { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import { Lock, LockKey } from 'phosphor-react';
import { colors } from '../../constants/colors';

const EmailVerificationOtp = () => {
  const [otp, setOtp] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleChange = (newValue) => {
    setOtp(newValue);
    setDisabled(newValue.length !== 6);
  };

  const validateChar = (char) => {
    return /^\d+$/.test(char); // Only allow digits (0-9)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP Submitted:', otp);
  };

  const getTooltipMessage = () => {
    return otp.length < 6
      ? `Please enter all 6 digits of the OTP.`
      : 'OTP is complete';
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            padding: 3,
            margin: 3,
            borderRadius: '50%',
            bgcolor: colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lock size={80} />
        </Box>
        <Typography color={colors.black} fontSize='2.5rem'>
          Email Verification
        </Typography>

        <Typography color={colors.gray} sx={{ mt: 2, textAlign: 'center' }}>
          Please enter the 6-digit OTP sent to your email.
        </Typography>

        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: '100%' }}
        >
          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            length={6}
            validateChar={validateChar}
            sx={{
              '& .MuiOtpInput-TextField': {
                width: '70px',
                height: '50px',
                '& input': {
                  borderRadius: '100%',
                  textAlign: 'center',
                  fontSize: '1.2rem',
                },
              },
            }}
          />

          <Tooltip title={getTooltipMessage()} arrow>
            <Box sx={{ width: '100%', padding: 0, mt: 3 }}>
              <Button
                type='submit'
                disabled={disabled}
                fullWidth
                variant='contained'
                startIcon={<LockKey size={24} />}
                sx={{ mt: 3, mb: 2 }}
              >
                Verify OTP
              </Button>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailVerificationOtp;
