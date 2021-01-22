import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* emailStudent(action) {
  try {
    yield axios.post(`/api/student/email`, action.payload);
  } catch (error) {
    console.log('Error with sending email with Student data:', error);
  }
}

function* emailSaga() {
  yield takeLatest('INVITE_STUDENT', emailStudent);
}

export default emailSaga;
