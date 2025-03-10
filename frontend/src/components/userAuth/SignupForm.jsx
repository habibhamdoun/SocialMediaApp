import { useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Link,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { Pen, Eye, EyeSlash } from 'phosphor-react';
import { colors, styles } from '../../constants/colors';
import axios from '../../api/axiosConfig.js';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const tooltipMessage = useMemo(() => {
    const missingFields = [];
    if (!formData.fullName.trim()) missingFields.push('Full Name');
    if (!formData.username.trim()) missingFields.push('Username');
    if (!formData.email.trim()) missingFields.push('Email');
    if (!formData.password.trim()) missingFields.push('Password');
    if (!formData.repeatPassword.trim()) missingFields.push('Repeat Password');

    return missingFields.length > 0
      ? `The following fields are missing: ${missingFields.join(', ')}`
      : 'All fields are filled';
  }, [formData]);

  useMemo(() => {
    const isFormValid = () => {
      return (
        formData.fullName.trim() &&
        formData.username.trim() &&
        formData.email.trim() &&
        formData.password.trim() &&
        formData.repeatPassword.trim() &&
        formData.password === formData.repeatPassword
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.fullName);
    form.append('username', formData.username);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('profilePicture', formData.avatar);
    try {
      const response = await axios.post('/register', form);
      if (response.data.success) {
        console.log('signup correctly');
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: 'success',
        });
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Something went wrong. Please try again.',
        severity: 'error',
      });
      console.error('Registration Error:', error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: colors.white,
        borderRadius: styles.borderRadius,
        display: 'flex',
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
                <input
                  type='file'
                  hidden
                  name='avatar'
                  onChange={handleChange}
                  accept='image/*'
                />
              </IconButton>
            </Box>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Full Name'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
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
              margin='normal'
              required
              fullWidth
              label='Password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Repeat Password'
              name='repeatPassword'
              type={showRepeatPassword ? 'text' : 'password'}
              value={formData.repeatPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  >
                    {showRepeatPassword ? (
                      <EyeSlash size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </IconButton>
                ),
              }}
            />
            <Tooltip title={tooltipMessage} arrow>
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
            <Link
              style={{
                alignSelf: 'flex-end',
                fontSize: '0.7rem',
              }}
              href='/login'
            >
              Already Have an account?
            </Link>
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
        src='/assets/signupimg.jpg'
        alt='Sign up'
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant='filled'
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;
