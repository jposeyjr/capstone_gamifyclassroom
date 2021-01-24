import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addClass(action) {
  try {
    yield axios.post('/api/class', action.payload);
    yield getClasses();
  } catch (error) {
    console.log('Error with adding classroom data: ', error);
  }
}

function* editClass(action) {
  try {
    yield axios.put('/api/class/id', action.payload);
    yield getClasses();
  } catch (error) {
    console.log('Error updating class with new info: ', error);
  }
}

function* getClasses() {
  try {
    const results = yield axios.get('/api/class');
    yield put({ type: 'SET_CLASSES', payload: results.data });
  } catch (error) {
    console.log('Error with getting classroom data:', error);
  }
}

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
