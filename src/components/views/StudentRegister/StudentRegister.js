import React from 'react';
import RegisterForm from '../../panels/RegisterForm/RegisterForm';
import { Link, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import globalUseStyles from '../../helpers/globalUseStyles';

const StudentRegister = () => {
  const history = useHistory();
  //used to re-use register form component they should only get to this page from an email invite
  const studentReg = true;
  const globalClass = globalUseStyles();
  return (
    <Grid container justify='center' className={globalClass.groot}>
      <Grid item xs={12} sm={4} className={globalClass.wrapper}>
        <RegisterForm studentReg={studentReg} />
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

export default StudentRegister;
