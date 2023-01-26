import { all, fork } from 'redux-saga/effects'

import postSaga from './postSaga'
import userSaga from './userSaga'
import axios from 'axios'

<<<<<<< HEAD
//axios.defaults.baseURL = 'http://localhost:3065'
//axios.defaults.withCredentials = true
=======
// axios.defaults.baseURL = 'http://localhost:3065'
// axios.defaults.withCredentials = true
>>>>>>> 104aee9e0a6eaad2128e0f557ffb7bf05c250000

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)])
}
