import React from 'react';
import LoginForm from '../../panels/LoginForm/LoginForm';
import { Link, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import globalUseStyles from '../../helpers/globalUseStyles';

const LoginPage = () => {
  const history = useHistory();
  const globalClass = globalUseStyles();
  return (
    <Grid container justify='center' className={globalClass.groot}>
      <Grid item xs={12} sm={4} className={globalClass.wrapper}>
        <LoginForm />
        <div className={globalClass.linkArea}>
          <Link
            role='link'
            underline='always'
            className={globalClass.loginLink}
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

export default LoginPage;
