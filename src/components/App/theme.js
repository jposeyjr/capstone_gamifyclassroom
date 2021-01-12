import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f4a261', //orange
    },
    secondary: {
      main: '#32E965', //GREEN
    },
    background: {
      default: '#264653', //blue
      paper: '#2a9d8f',
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
