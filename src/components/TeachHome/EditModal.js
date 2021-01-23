import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, TextField, Button, Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from './styles';

//used to set modal location on page taken from Mat-UI example
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
//used to set modal location on page taken from Mat-UI example
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const EditModal = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const teacher = useSelector((store) => store.user.id);
  const course = useSelector((store) => store.course);
  const [classData, setClassData] = useState({
    className: '',
    inviteCoteacher: '',
    teacher_id: teacher,
    start_date: Date.now(),
    end_date: Date.now(),
    id: 0,
  });

  //will submit a dispatch to update the current selected students info
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'EDIT_CLASS',
      payload: classData,
    });
    close();
  };

  useEffect(() => {
    //if the modal is open we will set the state to the course that was clicked to enable pre-filled form data
    if (props.isOpen) {
      setClassData((classData) => ({
        ...classData,
        className: course.course_name,
      }));
      setClassData((classData) => ({ ...classData, id: course.id }));
      setClassData((classData) => ({
        ...classData,
        start_date: course.start_date,
      }));
      setClassData((classData) => ({
        ...classData,
        end_date: course.end_date,
      }));
    }
  }, [props.isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  //just handles resetting the state data to null and closing the modal
  const close = () => {
    props.handleClose();
    setClassData('');
  };

  return (
    <div>
      <p>
        {props.isEdit
          ? 'Click on a class to edit the information or click edit class again to end edit mode!'
          : null}
      </p>
      <Modal open={props.isOpen} onClose={close}>
        <div style={modalStyle} className={classes.paper}>
          <h2>Edit Class</h2>
          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            autoComplete='off'
          >
            <TextField
              fullWidth
              value={classData.className}
              onChange={(e) =>
                setClassData({ ...classData, className: e.target.value })
              }
              label='Class Name'
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                fullWidth
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline-start'
                label='Class Start Date'
                value={classData.start_date}
                onChange={(date) =>
                  setClassData({ ...classData, start_date: date })
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                fullWidth
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline-end'
                label='Class End Date'
                value={classData.end_date}
                onChange={(date) =>
                  setClassData({ ...classData, end_date: date })
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              fullWidth
              className={classes.input}
              value={classData.inviteCoteacher}
              onChange={(e) =>
                setClassData({
                  ...classData,
                  inviteCoteacher: e.target.value,
                })
              }
              label='Invite Co-teacher'
            />
            <Box className={classes.btnArea}>
              <Button type='submit' className={classes.submit}>
                Submit
              </Button>
              <Button className={classes.cancel} onClick={close}>
                Cancel
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;
