import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button, Box, Slide, Paper } from '@material-ui/core';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import useStyles from './styles';
import socketClient from 'socket.io-client';

const StudentPage = () => {
  const student = useSelector((store) => store.user.id);
  const studentData = useSelector((store) => store.socketStudent);
  const [message, setMessage] = useState([]);
  const [gotMessage, setGotMessage] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  //used to set the end point to get messages from the teacher
  const endpoint = 'http://localhost:5000';
  //assigned it to a socket so we can get the messages.
  const socket = socketClient(endpoint);

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

  const handleAvatar = () => {
    setAvatarOpen(true);
  };

  const handleAvatarClose = (img) => {
    setAvatarOpen(false);
    //makes sure the student truly did pick an image
    if (typeof img === 'string') {
      console.log('img', img);
    }
  };

  return (
    <>
      <Typography variant='h3' component='h1' className={classes.headerArea}>
        Welcome {studentData.first_name}!
      </Typography>
      <Grid container justify='center' alignItems='center'>
        <Grid item xs={12} className={classes.imgHolder}>
          <img
            className={classes.imgWrapper}
            src={studentData.avatar}
            alt='avatar for student'
          ></img>
        </Grid>
        <Grid item xs={6} className={classes.buttonWrapper}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={handleAvatar}
          >
            Change Avatar
          </Button>
          <AvatarSelector
            avatarOpen={avatarOpen}
            handleAvatarClose={handleAvatarClose}
          />
          <Grid item xs={6}>
            <Typography variant='h4' className={classes.textArea} component='p'>
              Points: {studentData.points}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Slide direction='up' in={gotMessage} mountOnEnter unmountOnExit>
        <Paper className={classes.paper}>
          {JSON.stringify(message.message)}
        </Paper>
      </Slide>
    </>
  );
};

export default StudentPage;
