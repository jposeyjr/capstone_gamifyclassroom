import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import { Link, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const LoginPage = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12} sm={4} className={classes.wrapper}>
        <LoginForm />
        <div className={classes.linkArea}>
          <Link
            role='link'
            underline='always'
            className={classes.loginLink}
            component='button'
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default connect(mapStoreToProps)(LoginPage);
