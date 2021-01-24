import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Fetches student data from the DB so we can add points and send a message with their name
 * @param {Number} action Action payload that holds the students id
 * Server will send back corresponding info to be stored in redux state
 * May look like a duplicate of socket student, this one is for the teacher side
 * */

function* getSelectStudent(action) {
  const id = action.payload;
  try {
    const results = yield axios.get(`/api/student/solo/${id}`);
    yield put({ type: 'SET_SELECT_STUDENT', payload: results.data });
  } catch (error) {
    console.log('Error with getting Student data:', error);
  }
}

function* selectStudentSaga() {
  yield takeLatest('GET_SELECT_STUDENT', getSelectStudent);
}

export default selectStudentSaga;
