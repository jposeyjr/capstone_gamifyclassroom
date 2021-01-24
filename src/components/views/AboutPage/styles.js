import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  textArea: {
    margin: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.8em',
    },
    headerArea: {
      margin: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        fontSize: '3em',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '3.6em',
      },
    },
  },
}));
