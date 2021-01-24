import { makeStyles } from '@material-ui/core';
import { shadows } from '@material-ui/system';
const globalUseStyles = makeStyles((theme) => ({
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  button: {
    color: theme.palette.text.primary,
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
}));

export default globalUseStyles;
