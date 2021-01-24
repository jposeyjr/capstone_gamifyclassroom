import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../../panels/RegisterForm/RegisterForm';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Link, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import globalUseStyles from '../../helpers/globalUseStyles';

const RegisterPage = () => {
  const history = useHistory();
  const globalClass = globalUseStyles();
  return (
    <Grid container justify='center' className={globalClass.goot}>
      <Grid item xs={12} sm={4} className={globalClass.wrapper}>
        <RegisterForm />
        <div className={globalClass.linkArea}>
          <Link
            color='inherit'
            component='button'
            role='link'
            underline='always'
            className={globalClass.loginLink}
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
