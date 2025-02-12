import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { colors, styles } from '../../constants/colors';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <Box
      sx={{
        bgcolor: colors.white,
        borderRadius: styles.borderRadius,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            marginTop: 3,
            borderRadius: styles.borderRadius,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 3,
          }}
        >
          <Typography
            sx={{
              color: colors.black,
              fontSize: '2rem',
            }}
          >
            Reset Password
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30vw',
              maxWidth: '400px',
            }}
          >
            <TextField
              sx={{
                borderRadius: styles.borderRadius,
              }}
              margin='normal'
              required
              fullWidth
              label='Email'
              name='email'
              type='email'
              value={email}
              onChange={handleChange}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            ></Box>
            <Box
              sx={{
                width: '100%',
                padding: 0,
              }}
            >
              <Button
                type='submit'
                disabled={!!email}
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Box>
        <img
          className='w-[30vw] ml-auto'
          style={{
            borderRadius: styles.borderRadius,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          src='../../public/assets/signupimg.jpg'
        />
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
