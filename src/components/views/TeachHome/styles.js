import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';
export default makeStyles((theme) => ({
  contentWrapper: {
    maxWidth: 1280,
    width: '100%',
    background: theme.palette.background.default,
    margin: theme.spacing(1),
  },
  headerArea: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  // form: {
  //   width: '100%',
  //   marginTop: theme.spacing(1),
  // },
  card: {
    display: 'flex',
    maxWidth: 450,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
}));
