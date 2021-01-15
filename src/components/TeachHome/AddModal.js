import React, { useState } from 'react';
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

export default function SimpleModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const teacher = useSelector((store) => store.user.id);
  const [open, setOpen] = useState(false);

  const [classData, setClassData] = useState({
    className: '',
    inviteCoteacher: '',
    teacher_id: teacher,
    start_date: new Date('2019-12-02T11:11:11'),
    end_date: new Date('2019-12-03T12:12:12'),
  });

  //when they click the submit button it will send the state info to ADD_CLASS saga to post it to the DB
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_CLASS', payload: classData });
    setOpen(false);
  };

  //changes the state to open so they modal pops up
  const handleOpen = () => {
    setOpen(true);
  };

  //changes the state to close modal and reset the state data for the class to null
  const handleClose = () => {
    setOpen(false);
    setClassData('');
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={handleOpen}
      >
        Add Class
      </Button>

      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Add Class</h2>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
            autoComplete='off'
          >
            <TextField
              value={classData.className}
              fullWidth
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
              <Button className={classes.submit} type='submit'>
                Submit
              </Button>
              <Button className={classes.cancel} onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
}
