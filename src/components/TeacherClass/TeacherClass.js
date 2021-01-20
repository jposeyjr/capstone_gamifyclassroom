import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';

const TeacherClass = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [className, setName] = useState('');
  const [courseID, setCourse] = useState('');
  const studentData = useSelector((store) => store.socketStudent);
  const pointsData = useSelector((store) => store.pointStudent);
  const [colorChange, setColorChange] = useState(false);

  //when the component 'mounts' it will get the ID and name of course from the URL to persist after reloads
  useEffect(() => {
    const urlID = new URLSearchParams(location.search).get('classid');
    setCourse(urlID);
    const courseName = new URLSearchParams(location.search).get('course');
    setName(courseName);
    //with that information it will set the name and get students for the current course this allows teachers to bookmark classes
    dispatch({ type: 'GET_STUDENTS', payload: Number(urlID) });
  }, [location, studentData, pointsData]); // eslint-disable-line react-hooks/exhaustive-deps

  //changes date to a readable format
  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

  const handleColor = () => {
    setColorChange(!colorChange);
  };

  return (
    <Card
      id={props.student.student_id}
      className={classes.card}
      onClick={() => handleColor()}
      style={{
        backgroundColor: colorChange && props.multi ? '#944545' : '#0f3057',
      }}
    >
      <CardActionArea
        id={props.student.student_id}
        onClick={(e) => props.handleClick(e, props.student)}
        className={classes.atnArea}
      >
        {/* for now this will render an avatar if they have it if not a blank image,
        TODO better placeholder image */}
        {props.student.avatar ? (
          <CardMedia
            component='img'
            className={classes.avatar}
            image={props.student.avatar}
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
        <Grid container justify='flex-end'>
          <CardContent>
            <Typography variant='h5' color='textPrimary' component='h2'>
              {props.student.first_name} {props.student.last_name.slice(0, 1)}
            </Typography>
            <Typography variant='h6' color='textPrimary' component='p'>
              Points: {props.student.points}
            </Typography>
            <Typography variant='body1' color='textPrimary' component='p'>
              Last Point Earned: {handleDate(props.student.last_point_date)}
            </Typography>
          </CardContent>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default TeacherClass;
