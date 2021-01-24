import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/**
 * Fetches uses info from the DB to use auth
 * Config includes credentials which allows the server session to recognize the user.
 * If logged in this will return their info from server in req.user
 */

function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user', config);
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;
