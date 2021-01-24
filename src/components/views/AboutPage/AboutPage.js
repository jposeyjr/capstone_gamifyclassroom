import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textArea: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.8em',
    },
    headerArea: {
      margin: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        fontSize: '3em',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '3.6em',
      },
    },
  },
}));

const AboutPage = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} justify='center'>
      <Grid item xs={12} sm={8}>
        <Typography variant='h2' component='h1' className={classes.headerArea}>
          About
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.textArea}>
        <Typography variant='body1' component='p' gutterBottom>
          Gamified classrooms allow teachers to easily and quickly reward
          students for participating in the classroom, keep track of all
          students and activity levels throughout one or many classrooms. The
          gamified classroom is aimed to be quick, simple, and easy with limited
          intrusiveness to allow for quick approval by parents and school
          boards.
        </Typography>
        <br />
        <Typography variant='body1' component='p'>
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
