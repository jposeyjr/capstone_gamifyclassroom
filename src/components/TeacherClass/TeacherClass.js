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
  Button,
  Box,
} from '@material-ui/core';
import useStyles from './styles';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

const TeacherClass = () => {
  const [edit, setEdit] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const course = useSelector((store) => store.course);
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const students = useSelector((store) => store.student);

  useEffect(() => {
    const urlID = new URLSearchParams(location.search).get('classid');
    dispatch({ type: 'GET_STUDENTS', payload: urlID });
  }, [location]);

  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    if (!edit) {
      handleOpen();
    }
  };

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.headerArea}>
        <Typography variant='h3' component='h1'>
          {edit ? course.course_name : 'Select a student to edit'}
        </Typography>
      </div>
      <div className={classes.btnArea}>
        <AddStudent />
        <Button variant='contained' color='primary'>
          Invite Student
        </Button>
        <EditStudent
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => setEdit(!edit)}
        >
          Edit Student
        </Button>
        <Button variant='contained' color='primary'>
          Select Students
        </Button>
      </div>
      <Grid container spacing={3}>
        {students?.map((student) => (
          <Grid item xs={12} md={4} key={student.student_id}>
            <Card className={classes.card}>
              <CardActionArea onClick={handleClick}>
                <CardMedia
                  className={classes.media}
                  image='https://via.placeholder.com/150'
                  title='thing'
                  aria-label='an avatar character'
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h5'
                    color='textPrimary'
                    component='h2'
                  >
                    {student.first_name} {student.last_name.slice(0, 1)}
                  </Typography>
                  <Typography variant='body2' color='textPrimary' component='p'>
                    Points: {student.points}
                  </Typography>
                  <Typography variant='body2' color='textPrimary' component='p'>
                    Last Point Earned: {handleDate(student.last_point_date)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeacherClass;
