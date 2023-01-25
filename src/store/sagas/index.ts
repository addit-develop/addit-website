import { all, fork } from 'redux-saga/effects'

import postSaga from './postSaga'
import userSaga from './userSaga'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3065'
axios.defaults.withCredentials = true

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)])
}
