import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, TextField, Button, Box } from '@material-ui/core';
import SubmitButton from '../../helpers/SubmitButton/SubmitButton';
import CancelButton from '../../helpers/CancelButton/CancelButton';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import globalUseStyles from '../../helpers/globalUseStyles';

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
  const globalClass = globalUseStyles();
  const [modalStyle] = useState(getModalStyle);
  const teacher = useSelector((store) => store.user.id);
  const [open, setOpen] = useState(false);
  const currentDate = Date.now();
  const [classData, setClassData] = useState({
    className: '',
    inviteCoteacher: '',
    teacher_id: teacher,
    start_date: new Date(currentDate),
    end_date: new Date(currentDate),
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
  const handleCancel = () => {
    setOpen(false);
    setClassData('');
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Add Class
      </Button>

      <Modal open={open} onClose={handleCancel}>
        <div style={modalStyle} className={globalClass.paper}>
          <h2>Add Class</h2>
          <form onSubmit={(e) => handleSubmit(e)} noValidate autoComplete='off'>
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
              className={globalClass.input}
              value={classData.inviteCoteacher}
              onChange={(e) =>
                setClassData({
                  ...classData,
                  inviteCoteacher: e.target.value,
                })
              }
              label='Invite Co-teacher'
            />
            <Box className={globalClass.btnArea}>
              <SubmitButton />
              <CancelButton handleCancel={handleCancel} />
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
}
