import { useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Tooltip,
} from '@mui/material';
import { Key, Pen } from 'phosphor-react';
import { colors, styles } from '../../constants/colors';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    avatar: null,
  });
  const [disabled, setDisabled] = useState(true);
  const getTooltipMessage = () => {
    const missingFields = [];
    if (!formData.fullName.trim()) missingFields.push('Full Name');
    if (!formData.username.trim()) missingFields.push('Username');
    if (!formData.email.trim()) missingFields.push('Email');
    if (!formData.password.trim()) missingFields.push('Password');
    if (!formData.repeatPassword.trim()) missingFields.push('Repeat Password');

    return missingFields.length > 0
      ? `The following fields are missing: ${missingFields.join(', ')}`
      : 'All fields are filled';
  };
  useMemo(() => {
    const isFormValid = () => {
      return (
        formData.fullName.trim() &&
        formData.username.trim() &&
        formData.email.trim() &&
        formData.password.trim() &&
        formData.repeatPassword.trim()
      );
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
            alignItems: 'center',
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
            Create an account
          </Typography>
          <Typography fontSize='0.7rem' color={colors.gray}>
            to continue please fill out your info
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
            <Box sx={{ position: 'relative', width: 100, height: 100, mb: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={
                  formData.avatar ? URL.createObjectURL(formData.avatar) : ''
                }
              />
              <IconButton
                component='label'
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                <Pen size={24} color='white' />
                <TextField
                  type='file'
                  hidden
                  name='avatar'
                  onChange={handleChange}
                  required
                />
              </IconButton>
            </Box>
            <TextField
              sx={{
                borderRadius: styles.borderRadius,
              }}
              margin='normal'
              required
              fullWidth
              label='Full Name'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              sx={{
                borderRadius: styles.borderRadius,
              }}
              margin='normal'
              required
              fullWidth
              label='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
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
            <TextField
              sx={{
                borderRadius: styles.borderRadius,
              }}
              margin='normal'
              required
              fullWidth
              placeholder='Repeat Password'
              label='Repeat Password'
              name='repeatPassword'
              type='password'
              value={formData.repeatPassword}
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
                Already have an account?
              </Typography>
              <Link
                sx={{
                  fontSize: '0.8rem',
                }}
                href='/login'
              >
                Login
              </Link>
            </Box>
            <Tooltip
              sx={{
                padding: 1,
              }}
              title={getTooltipMessage()}
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
                  Sign up
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

export default SignUpForm;
