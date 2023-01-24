import { all, fork } from 'redux-saga/effects'

import postSaga from './post'
import userSaga from './user'

// axios.defaults.baseURL = ''
// axios.defaults.withCredentials = true

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)])
}
