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
import Swal from 'sweetalert2';

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

  /**
   * Takes in the course that was clicked on and will alter what it does based on other booleans
   * @param {Object} course holds course id, name, start/end date and any co-teachers info
   * @param {Boolean} edit signifies if they have chosen to edit the class, if so it opens a modal
   * @param {Boolean} remove signifies if they have chosen to remove a class, if so it confirm they want to delete it
   * If not they get passed onto the teacher class page to view current students of that course
   * */
  const sendCourse = (course) => {
    dispatch({ type: 'SET_COURSE', payload: course });
    dispatch({ type: 'GET_STUDENTS', payload: course.id });
    if (!edit && !remove) {
      history.push({
        pathname: '/teacherclass',
        search: `?classid=${course.id}&course=${course.course_name}`,
      });
    }
    if (remove && !edit) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this class info!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'You have removed the class from your list.',
            'success'
          );
          dispatch({ type: 'REMOVE_CLASS', payload: course.id });
        }
      });
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
