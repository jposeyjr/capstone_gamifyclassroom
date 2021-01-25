import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button, Slide, Paper } from '@material-ui/core';
import socketClient from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import AvatarSelector from '../../helpers/AvatarSelector/AvatarSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
  },
  headerArea: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
  imgHolder: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2em',
  },
  imgWrapper: {
    maxWidth: 250,
  },
  paper: {
    fontSize: '2em',
    // boxShadow: 'none',
    marginLeft: '25%',
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    width: 550,
    maxWidth: 550,
    padding: 10,
    border: '1px solid #00ff2d',
    margin: theme.spacing(1),
  },
  btnArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  button: {
    color: theme.palette.text.primary,
    borderRadius: 40,
    padding: '0 1em',
    minHeight: 33,
  },
}));

const StudentPage = () => {
  const student = useSelector((store) => store.user.id);
  const studentData = useSelector((store) => store.socketStudent);
  const [message, setMessage] = useState([]);
  const [gotMessage, setGotMessage] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const endpoint = process.env.WS_ENDPOINT || 'http://localhost:5000';
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
      }, 1800);
    });
    return () => socket.disconnect();
  }, [message]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAvatar = () => {
    setAvatarOpen(true);
  };

  /**
   * Handles avatar dialog box
   * @param {String} img holds selected img base64 string if chosen
   * If not do not select an image it will be an object not a string and will not cause their current avatar to change
   * */
  const handleAvatarClose = (img) => {
    setAvatarOpen(false);
    if (typeof img === 'string') {
      dispatch({
        type: 'UPDATE_AVATAR',
        payload: { avatar: img, student: studentData },
      });
    }
  };

  return (
    <div className={classes.root}>
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
        <Grid item xs={6} className={classes.btnArea}>
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
            <Typography variant='h4' component='p'>
              Points: {studentData.points}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Slide direction='up' in={gotMessage} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.paper}>
          <p>{message.message}</p>
        </Paper>
      </Slide>
    </div>
  );
};

export default StudentPage;
