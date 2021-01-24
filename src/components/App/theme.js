import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Google Sans',
      'Roboto,RobotoDraft',
      'Helvetica,Arial',
      'sans-serif',
    ].join(','),
    textTransform: 'none',
    fontWeight: 500,
  },
  status: {
    danger: '#bf463d',
    secondary: '#c92a1e',
    submit: '#2767e6',
    back: '#050ce6',
  },
  palette: {
    primary: {
      main: '#f4a261', //orange
    },
    secondary: {
      main: '#FFF',
    },
    background: {
      default: '#0f3057', //blue
      paper: '#2e4a6b',
    },
    text: {
      primary: '#FFF', //white
      secondary: '#e9c46a', //yellow
    },
    divider: '#FFF',
  },
  overrides: {
    MuiButton: {
      root: {
        color: '#f4a261',
        borderRadius: 40,
        minHeight: 15,
        maxHeight: 30,
        padding: '0 1em',
        boxShadow: shadows[0],
        '&:hover': {
          boxShadow: shadows[0],
        },
        '&:active': {
          boxShadow: shadows[0],
        },
        '&:focus': {
          boxShadow: shadows[0],
        },
      },
      label: {
        color: '#FFF',
      },
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;
