import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Fetches student data from the DB so we can add points and send a message with their name
 * @param {Number} action Action payload that holds the students id
 * Server will send back corresponding info to be stored in redux state
 * */
function* getSocketStudent(action) {
  const id = action.payload;
  try {
    const results = yield axios.get(`/api/student/solo/${id}`);
    yield put({ type: 'SET_SOCKET_STUDENT', payload: results.data });
  } catch (error) {
    console.log('Error with getting socket Student data:', error);
  }
}

function* socketSaga() {
  yield takeLatest('GET_SOCKET_STUDENT', getSocketStudent);
}

export default socketSaga;
