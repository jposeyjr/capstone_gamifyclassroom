import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Send an id to the server to update the points in the DB for the selected student
 * @param {Number} action Action payload that holds the id
 * */

function* getPointStudent(action) {
  const id = action.payload;
  try {
    const results = yield axios.put(`/api/student/point/${id}`);
    yield put({ type: 'SET_POINT_STUDENT', payload: results.data });
  } catch (error) {
    console.log('Error with getting point Student data:', error);
  }
}

function* pointSaga() {
  yield takeLatest('GET_POINT_STUDENT', getPointStudent);
}

export default pointSaga;
