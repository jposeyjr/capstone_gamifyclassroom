import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import useStyles from './styles';
const AboutPage = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={6} justify='center'>
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant='h2' component='h1' className={classes.headerArea}>
          Welcome
        </Typography>
        <Typography variant='body1' component='p' className={classes.textArea}>
          Gamified classrooms allow teachers to easily and quickly reward
          students for participating in the classroom, keep track of all
          students and activity levels throughout one or many classrooms. The
          gamified classroom is aimed to be quick, simple, and easy with limited
          intrusiveness to allow for quick approval by parents and school
          boards.
        </Typography>
        <Typography variant='body1' component='p' className={classes.textArea}>
          This application was made in a two-week sprint for a middle school
          teacher in Virginia. I used Javasript, React, Redux, Redux-Sagas,
          Material-UI, Node, Express, PostgreSQL, Websockets, Nodemailer, and
          Passport.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AboutPage;
