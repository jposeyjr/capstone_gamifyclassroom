import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button, Box, Slide, Paper } from '@material-ui/core';
import socketClient from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headerArea: {
    display: 'flex',
    justifyContent: 'center',
  },
  imgHolder: {
    maxWidth: 250,
  },
  imgWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textArea: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  paper: {
    fontSize: '2em',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    width: 550,
    padding: 30,
    border: '.5px solid #bf463d',
    margin: theme.spacing(1),
  },
  btnArea: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
  },
}));

const StudentPage = () => {
  const student = useSelector((store) => store.user.id);
  const studentData = useSelector((store) => store.socketStudent);
  const [message, setMessage] = useState([]);
  const [gotMessage, setGotMessage] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  //used to set the end point to get messages from the teacher
  const endpoint = 'http://localhost:5000';
  //assigned it to a socket so we can get the messages.
  const socket = socketClient(endpoint);

  const handleAvatar = () => {
    console.log('why');
  };

  useEffect(() => {
    //getting their info from the DB to display it to the dom
    dispatch({ type: 'GET_SOCKET_STUDENT', payload: student });
    //used to establish a connection to the backend to watch for messages from the teacher
    socket.on('connection', () => {});
    //when we gt a message we will save it to the state so we can display it
    socket.on('newMessage', ({ message }) => {
      setMessage({ ...message, message });
      setGotMessage(true);
      setTimeout(() => {
        setMessage([]);
        setGotMessage(false);
      }, 1500);
    });
  }, [gotMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid
      container
      spacing={1}
      direction='row'
      justify='center'
      alignItems='center'
    >
      <Grid item xs={6}>
        <Typography variant='h3' component='h1' className={classes.headerArea}>
          Welcome {studentData.first_name}!
        </Typography>
        <Box className={classes.btnArea}>
          <Button variant='contained' color='primary' onClick={handleAvatar}>
            Change Avatar
          </Button>
          <Button variant='contained' color='primary' onClick={handleAvatar}>
            Buy Gear
          </Button>
        </Box>
        <Box className={classes.imgWrapper}>
          <Typography variant='h4' className={classes.textArea} component='p'>
            Points: {studentData.points}
          </Typography>
          <img
            className={classes.imgHolder}
            src={studentData.avatar}
            alt='avatar for student'
          ></img>
        </Box>
        <Slide direction='up' in={gotMessage} mountOnEnter unmountOnExit>
          <Paper className={classes.paper}>
            {JSON.stringify(message.message)}
          </Paper>
        </Slide>
      </Grid>
    </Grid>
  );
};

export default StudentPage;
