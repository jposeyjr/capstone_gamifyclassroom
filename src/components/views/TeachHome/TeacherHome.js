import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import AddModal from '../../panels/TeacherModals/AddModal';
import EditModal from '../../panels/TeacherModals/EditModal';
import { makeStyles } from '@material-ui/core/styles';
import globalUseStyles from '../../helpers/globalUseStyles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    maxWidth: 450,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
}));

const TeacherHome = () => {
  const [edit, setEdit] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [remove, setRemove] = useState(false);

  const teacher = useSelector((store) => store.user.first_name);
  const classroom = useSelector((store) => store.classroom);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const globalClass = globalUseStyles();

  //getting all the current classes for the logged in teacher
  useEffect(() => {
    dispatch({ type: 'GET_CLASSES' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sendCourse = (course) => {
    //set the current course that is selected by the teacher on click
    dispatch({ type: 'SET_COURSE', payload: course });
    //sends the course id to get only the students that belong to it
    dispatch({ type: 'GET_STUDENTS', payload: course.id });
    //if they are not in edit mode it will send them to the course page
    if (!edit && !remove) {
      history.push({
        pathname: '/teacherclass',
        search: `?classid=${course.id}&course=${course.course_name}`,
      });
    }
    if (remove && !edit) {
      dispatch({ type: 'REMOVE_CLASS', payload: course.id });
    }
    if (edit && !remove) {
      //open the modal
      setOpen(true);
    }
  };

  //handling closing of the modal
  const handleClose = () => {
    setOpen(false);
  };

  //handles opening of the modal
  const handleOpen = () => {
    setOpen(true);
  };

  //converting the date to readable format
  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

  return (
    <div className={globalClass.contentWrapper}>
      <div className={globalClass.headerArea}>
        <Typography variant='h3' component='h1'>
          {remove
            ? 'Select a class to remove'
            : !edit
            ? teacher + "'s Overview"
            : 'Select a class to edit'}
        </Typography>
      </div>
      <div className={globalClass.btnArea}>
        <AddModal />
        <EditModal
          isEdit={edit}
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
        <Button
          variant='contained'
          color='primary'
          onClick={() => setRemove(!remove)}
        >
          Remove Class
        </Button>
      </div>
      <Grid justify='center' container spacing={3}>
        {classroom.map((course, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box>
              <Card className={classes.card}>
                <CardActionArea onClick={() => sendCourse(course)}>
                  <CardContent>
                    <Typography variant='h4' gutterBottom>
                      <b>{course.course_name}</b>
                    </Typography>
                    <CardContent>
                      <Typography variant='body2' component='p'>
                        Student Total: {course.count}
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
