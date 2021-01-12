import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import AddModal from './AddModal';
import useStyles from './styles';
const TeacherHome = () => {
  const classroom = useSelector((store) => store.classroom);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_CLASSES' });
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.headerArea}>
        <Typography variant='h3' component='h1'>
          My Classes
        </Typography>
      </div>
      <div className={classes.btnArea}>
        <AddModal />
        <button>Edit Class</button>
      </div>
      <Grid justify='center' container spacing={3}>
        {classroom.map((course) => (
          <Grid item xs={12} md={9} key={classes.id + classes.course_name}>
            <Box>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='h4' gutterBottom>
                      <b>{course.course_name}</b>
                    </Typography>
                    <CardContent>
                      <Typography variant='body2' component='p'>
                        Student Total:{course.student_total}
                      </Typography>
                      <Typography variant='body2' component='p'>
                        Start Date: {course.start_date}
                      </Typography>
                      <Typography variant='body2' component='p'>
                        End Date: {course.end_date}
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
