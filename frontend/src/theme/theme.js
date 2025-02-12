import { createTheme } from '@mui/material/styles';
import { colors } from '../constants/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.light,
    },
    background: {
      default: colors.background,
    },
    text: {
      primary: colors.text,
    },
    divider: colors.border,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'fill' },
          style: {
            backgroundColor: colors.primary,
            color: colors.text,
            boxShadow: `0px 4px 6px ${colors.shadow}`,
            '&:hover': {
              backgroundColor: colors.dark,
              boxShadow: `0px 6px 10px ${colors.shadow}`,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: colors.primary,
            boxShadow: `0px 6px 10px ${colors.shadow}`,
            backgroundColor: 'transparent',
            '&:hover': {
              borderColor: colors.primary,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
