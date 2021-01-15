import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import useStyles from './styles';
import socketClient from 'socket.io-client';

const StudentPage = () => {
  const student = useSelector((store) => store.user.id);
  const [message, setMessage] = useState([]);
  const endpoint = 'http://localhost:5000';
  const socket = socketClient(endpoint);

  useEffect(() => {
    socket.on('connection', () => {
      console.log('connect to backend');
    });
    socket.on('newMessage', ({ message }) => {
      setMessage({ ...message, message });
    });
  }, [socket]);

  return (
    <div>
      {/* <Grid container spacing={1}>
        {students?.map((student) => (
          <Grid item xs={12} md={2} key={student.student_id}>
            <Card className={classes.card}>
              <CardActionArea onClick={() => handleClick(student)}> */}
      {/* for now this will render an avatar if they have it if not a blank image, TODO better placeholder image */}
      {/* {student.avatar ? (
                  <CardMedia
                    component='img'
                    className={classes.avatar}
                    image={student.avatar}
                    title='avatar'
                    aria-label='an avatar character'
                  />
                ) : (
                  <CardMedia
                    className={classes.media}
                    image={'https://via.placeholder.com/150'}
                    title='avatar'
                    aria-label='blank place holder'
                  />
                )}
                <CardContent>
                  <Typography variant='body2' color='textPrimary' component='p'>
                    Points: {student.points}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      <h1>Welcome Student Name</h1>
      <div>
        <p>{JSON.stringify(student)}</p>
        {/* Avatar Image  */}
        <img src='https://via.placeholder.com/150' alt='placeholder blank' />
        <button>Change Avatar</button>
      </div>
      <div>
        <p>ClassRoom Name: Teacher Name</p>
        <p>Points Earned: 0 </p>
        <p>Message: {JSON.stringify(message.message)}</p>
      </div>
    </div>
  );
};

export default StudentPage;
