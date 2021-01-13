import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import AddModal from './AddModal';
import EditModal from './EditModal';
import useStyles from './styles';

const TeacherHome = () => {
  const [edit, setEdit] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const classroom = useSelector((store) => store.classroom);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch({ type: 'GET_CLASSES' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sendCourse = (course) => {
    dispatch({ type: 'SET_COURSE', payload: course });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.headerArea}>
        {edit ? (
          <Typography variant='h3' component='h1'>
            My Classes
          </Typography>
        ) : (
          <Typography variant='h3' component='h1'>
            Edit Classes
          </Typography>
        )}
      </div>
      <div className={classes.btnArea}>
        <AddModal />
        <EditModal
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => setEdit(!edit)}
        >
          Edit Class
        </Button>
      </div>
      <Grid justify='center' container spacing={3}>
        {classroom.map((course) => (
          <Grid item xs={12} md={4} key={course.id}>
            <Box>
              <Card className={classes.card}>
                <CardActionArea onClick={() => sendCourse(course)}>
                  <CardContent>
                    <Typography variant='h4' gutterBottom>
                      <b>{course.course_name}</b>
                    </Typography>
                    <CardContent>
                      <Typography variant='body2' component='p'>
                        Student Total:{course.student_total}
                      </Typography>
                      <Typography variant='body2' component='p'>
                        Start Date: {handleDate(course.start_date)}
                      </Typography>
                      <Typography variant='body2' component='p'>
                        End Date: {handleDate(course.end_date)}
                      </Typography>
                    </CardContent>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeacherHome;
