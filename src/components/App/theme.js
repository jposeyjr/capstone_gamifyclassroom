import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

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
      main: '#FFFFFF',
    },
    background: {
      default: '#0f3057', //blue
      paper: '#2e4a6b',
    },
    text: {
      primary: '#FFFFFF', //white
      secondary: '#e9c46a', //yellow
    },
    divider: '#FFFFFF',
  },
});
theme = responsiveFontSizes(theme);
export default theme;
