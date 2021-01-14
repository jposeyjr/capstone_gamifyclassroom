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
    danger: '#f44336',
    secondary: '#a82520',
    submit: '#050bb3',
    back: '#030659',
  },
  palette: {
    primary: {
      main: '#f4a261', //orange
    },
    secondary: {
      main: '#FFFFFF', //GREEN
    },
    background: {
      default: '#0f3057', //blue
      paper: '#2e4a6b',
    },
    text: {
      primary: '#FFFFFF', //white
      secondary: '#e9c46a', //yellow
    },
    divider: '#FFFFFF', //e76f51 darker orange place holder
  },
});
theme = responsiveFontSizes(theme);
export default theme;
