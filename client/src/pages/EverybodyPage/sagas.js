import {
  takeLatest,
  put,
  call,
  delay,
} from 'redux-saga/effects';

import {
  getEverybodySuccess,
  getEverybodyFail,
} from '../../redux/actions';
import { EVERYBODY } from '../../redux/typeAction';
import { 
  fetchEverybody,
  fetchSearchUser,
} from '../../api';

function* getEverybody(action) {
  try {
    const searchText = action.payload;
    let usersResult = {};

    if (searchText !== '') {
      yield delay(500);
      usersResult = yield call(fetchSearchUser, { searchText });
    } else {
      usersResult = yield call(fetchEverybody);
    }

    console.log('------- usersResult ------- getEverybody');
    console.log(usersResult);
    console.log('------- usersResult ------- getEverybody');
    
    yield put(getEverybodySuccess(usersResult.data));
  } catch (error) {
    console.log('------- error ------- getEverybody');
    console.log(error);
    console.log('------- error ------- getEverybody');
    yield put(getEverybodyFail());
  }
}

function* EverybodyWatcher() {
  yield takeLatest(EVERYBODY.GET_USER_REQUEST, getEverybody);
}

export default EverybodyWatcher;