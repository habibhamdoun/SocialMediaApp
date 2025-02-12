import { useMemo, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Link,
  Tooltip,
} from '@mui/material';
import { Key } from 'phosphor-react';
import { colors, styles } from '../../constants/colors';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    avatar: null,
  });
  const [disabled, setDisabled] = useState(true);

  useMemo(() => {
    const isFormValid = () => {
      return formData.email.trim() && formData.password.trim();
    };
    setDisabled(!isFormValid());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            Login to your account
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
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              sx={{
                borderRadius: styles.borderRadius,
              }}
              margin='normal'
              required
              fullWidth
              placeholder='Password'
              label='Password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Key size={24} color={colors.gray} />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              fontSize='0.7rem'
              color={colors.gray}
              sx={{
                paddingY: 2,
                paddingX: 0.2,
              }}
            >
              by clicking Sign up, you agree to our Terms and Conditions,
              confirm you have read our Policy Privacy Notice.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                  gap: 1,
                }}
              >
                <Typography
                  color={colors.black}
                  fontWeight={400}
                  fontSize='0.8rem'
                >
                  Don{"'"}t have an account?
                </Typography>
                <Link
                  sx={{
                    fontSize: '0.8rem',
                    p: 0,
                  }}
                  href='/login'
                >
                  Sign up
                </Link>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  gap: 1,
                }}
              >
                <Link
                  sx={{
                    fontSize: '0.8rem',
                    p: 0,
                  }}
                  href='/reset-password'
                >
                  Forgot Password?
                </Link>
              </Box>
            </Box>
            <Tooltip
              title={`The following fields are missing: ${
                formData.email ? '' : 'Email, '
              } ${formData.password ? '' : 'Password'} `}
              arrow
            >
              <Box
                sx={{
                  width: '100%',
                  padding: 0,
                }}
              >
                <Button
                  type='submit'
                  disabled={disabled}
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Box>
            </Tooltip>
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

export default LoginForm;
