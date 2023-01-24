import { all, fork, call, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios'

import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
} from '../types'

// logInAPI는 제너레이터가 아님
function logInAPI(data: any) {
  return axios.post('/user/login', data)
}

// fuction*은 제너레이터 함수로 중간에 중단점(yield)을 만들 수 있다
// put은 dispatch라 생각하면 된다
// call은 동기 함수 호출 => 결과값을 받아올 때까지 기다린다
function* logIn(action: any) {
  try {
    const result = yield call(logInAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      //data: result.data,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function logOutAPI() {
  return axios.post('/user/logout')
}

function* logOut() {
  try {
    yield call(logOutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
      //data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

// take('LOG_IN', logIn)은 'LOG_IN' action이 실행될 때까지 기다린 후 logIn 함수를 실행
// 이벤트 리스너와 유사한 역할
// logIn 함수를 실행할 때 'LOG_IN_REQUEST' action이 매개변수로 전달된다
// take만 쓰면 일회용이므로 while 혹은 takeEvery(takeLatest)를 쓴다
// takeLatest는 다중 클릭 시 마지막 응답만 처리된다. 실수로 여러번 클릭하는 경우를 대처 가능
function* watchLogIn() {
  /*
	//동기
	while (true) {
		yield take('LOG_IN_REQUEST', logIn);	
	}
	*/
  //비동기
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

// all은 배열 안에 있는 것들을 모두 동시에 실행
// fork는 비동기 함수 호출
export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)])
}
