import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getPointStudent(action) {
  try {
    yield axios.post(`/api/student/email`, action.payload);
  } catch (error) {
    console.log('Error with sending email with Student data:', error);
  }
}

function* pointSaga() {
  yield takeLatest('INVITE_STUDENT', getPointStudent);
}

export default pointSaga;
