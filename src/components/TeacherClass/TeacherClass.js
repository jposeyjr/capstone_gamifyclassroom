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
} from '@material-ui/core';
import useStyles from './styles';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

const TeacherClass = () => {
  const [edit, setEdit] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [removeStudent, setRemoveStudent] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const students = useSelector((store) => store.student);
  const [className, setName] = useState('');
  const [courseID, setCourse] = useState('');

  //when the component 'mounts' it will get the ID and name of course from the URL to persist after reloads
  useEffect(() => {
    const urlID = new URLSearchParams(location.search).get('classid');
    setCourse(urlID);
    const courseName = new URLSearchParams(location.search).get('course');
    setName(courseName);
    //with that information it will set the name and get students for the current course this allows teachers to bookmark classes
    dispatch({ type: 'GET_STUDENTS', payload: Number(urlID) });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //changes date to a readable format
  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

  //changes state of open to close the modal
  const handleClose = () => {
    setOpen(false);
    dispatch({ type: 'GET_STUDENTS', payload: Number(courseID) });
  };

  //changes state of open to true to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  //this will be used to get the current student than it will call the point reducer to get current selected students info and points
  //TODO make the reducer and break this out of student to prevent mutating the same array used to render
  const handleClick = (id) => {
    const selectedStudent = id;
    dispatch({ type: 'GET_SELECT_STUDENT', payload: selectedStudent });
    //checking if it is edit mode if so change open to true so the pop up opens when clicked, if not it will send points
    if (edit) {
      handleOpen();
    }
    if (removeStudent) {
      dispatch({ type: 'DELETE_STUDENT', payload: selectedStudent });
    }
  };

  //adds the option to remove students from DB with a dispatch based on student that is clicked.
  const handleDelete = () => {
    setRemoveStudent(!removeStudent);
  };

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.headerArea}>
        <Typography variant='h3' component='h1'>
          {!removeStudent
            ? 'Select a student to remove'
            : !edit
            ? className
            : 'Select a student to edit'}
        </Typography>
      </div>
      <div className={classes.btnArea}>
        <Button variant='contained' className={classes.button} color='primary'>
          Select Students
        </Button>
        <AddStudent />
        <Button
          variant='contained'
          className={classes.button}
          onClick={handleDelete}
          color='primary'
        >
          Remove Student
        </Button>
        <Button
          variant='contained'
          className={classes.button}
          color='primary'
          onClick={() => setEdit(!edit)}
        >
          Edit Student
        </Button>
        <Button variant='contained' className={classes.button} color='primary'>
          Invite Student
        </Button>
        <EditStudent
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>

      <Grid container spacing={1}>
        {students?.map((student) => (
          <Grid item xs={12} md={2} key={student.student_id}>
            <Card className={classes.card}>
              <CardActionArea onClick={() => handleClick(student.student_id)}>
                {/* for now this will render an avatar if they have it if not a blank image, TODO better placeholder image */}
                {student.avatar ? (
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
