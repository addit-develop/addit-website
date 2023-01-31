import { all, fork } from 'redux-saga/effects'

import postSaga from './postSaga'
import userSaga from './userSaga'
import backAxios from '../configureBackAxios'

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)])
}
