import { takeEvery, eventChannel } from 'redux-saga';
import { put, call, take } from 'redux-saga/effects';

function* watchMessageEventChannel(socket) {
  const channel = eventChannel((emit) => {
    socket.on('message', (message) => emit(message));
    return () => {
      socket.close().then(() => console.log('closed'));
    };
  });
  while (true) {
    const message = yield take(channel);
    yield put('SET_POINTS', message);
  }
}
