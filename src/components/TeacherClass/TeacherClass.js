import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const TeacherClass = () => {
  const course = useSelector((store) => store.course);
  const classes = useStyles();
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.headerArea}>
        <Typography variant='h3' component='h1'>
          {course.course_name}
        </Typography>
      </div>
      <Button variant='contained' color='primary'>
        Add Student
      </Button>
      <Button variant='contained' color='primary'>
        Invite Student
      </Button>
      <Button variant='contained' color='primary'>
        Edit Student
      </Button>
      <Button variant='contained' color='primary'>
        Select Students
      </Button>
      <Grid justify='center' container spacing={3}>
        {/* {classroom.map((course) => ( */}
        <Grid item xs={12} md={4} key={course.id}>
          <Card className={classes.card}>
            <CardActionArea>
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
                  color='textSecondary'
                  component='h2'
                >
                  Student Name
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Points: 0
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Last Point Earned: Date
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeacherClass;
