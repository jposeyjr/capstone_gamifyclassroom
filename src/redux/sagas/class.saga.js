import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Add a new class to the current teacher's home page and DB
 * @param {Object} action Action payload that holds the class name, start/end date and co-teachers email
 * */
function* addClass(action) {
  try {
    yield axios.post('/api/class', action.payload);
    yield getClasses();
  } catch (error) {
    console.log('Error with adding classroom data: ', error);
  }
}
/**
 * Edits classes on the current teacher's home page and DB
 * @param {Object} action Action payload that holds the class name, start/end date and co-teachers email
 * */

function* editClass(action) {
  try {
    yield axios.put('/api/class/id', action.payload);
    yield getClasses();
  } catch (error) {
    console.log('Error updating class with new info: ', error);
  }
}

/**
 * Gets all classes of the current teacher
 * @param {Object} action Action payload that holds the class name, start/end date and co-teachers email
 * */
function* getClasses() {
  try {
    const results = yield axios.get('/api/class');
    yield put({ type: 'SET_CLASSES', payload: results.data });
  } catch (error) {
    console.log('Error with getting classroom data:', error);
  }
}

/**
 * Removes an old class from the current teacher's home page and DB
 * @param {Object} action Action payload that holds the class name, start/end date and co-teachers email
 * */
function* removeClass(action) {
  const id = action.payload;
  try {
    yield axios.delete(`/api/class/${id}`);
    yield getClasses();
  } catch (error) {
    console.log('Error updating class with new info: ', error);
  }
}

function* classSaga() {
  yield takeLatest('GET_CLASSES', getClasses);
  yield takeLatest('ADD_CLASS', addClass);
  yield takeLatest('EDIT_CLASS', editClass);
  yield takeLatest('REMOVE_CLASS', removeClass);
}

export default classSaga;
