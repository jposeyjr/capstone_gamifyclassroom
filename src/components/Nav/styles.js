import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  icon: {
    color: theme.palette.text.primary,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  title: {
    width: '100%',
    color: theme.palette.text.primary,
    fontSize: '3.5rem',
    textAlign: 'center',
    justifyContent: 'center',
  },
}));
