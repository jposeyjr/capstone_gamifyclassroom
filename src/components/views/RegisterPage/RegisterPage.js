import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../../panels/RegisterForm/RegisterForm';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Link, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const RegisterPage = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12} sm={4} className={classes.wrapper}>
        <RegisterForm />
        <div className={classes.linkArea}>
          <Link
            color='inherit'
            component='button'
            role='link'
            underline='always'
            className={classes.loginLink}
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default connect(mapStoreToProps)(RegisterPage);
