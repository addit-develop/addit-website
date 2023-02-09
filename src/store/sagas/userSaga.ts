import { PostSummary } from '@/types'
import { all, fork, call, put, takeLatest, throttle} from 'redux-saga/effects'
import backAxios from '../configureBackAxios'

import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  CHECK_USER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_MY_POST_SUCCESS,
  LOAD_MY_POST_ERROR,
  LOAD_MY_POST_REQUEST,
} from '../types'

function loadUserAPI() {
  return backAxios.get('/auth')
}
function* loadUser() {
  try {
    const result: { data: string } = yield call(loadUserAPI)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    })
    return result.data
  } catch (err: any) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    })
  }
}

function checkUserAPI(data: any) {
  return backAxios.post('/auth/checkUser', data)
}
function* checkUser(action: any) {
  try {
    const result: { data: { nickname: string } } = yield call(checkUserAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch (err: any) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response,
    })
  }
}

function logOutAPI() {
  return backAxios.get('/auth/logout')
}

function* logOut() {
  try {
    yield call(logOutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err: any) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}


function loadPostAPI(constraint : {}){
  return backAxios.post("/post/load", constraint)
}

function* loadPost(action : any){
  try{
      const result : {data:PostSummary[]} = yield call(loadPostAPI, action.constraint)
      yield put({
          type:LOAD_MY_POST_SUCCESS,
          data:result.data,
      })
  }catch(err : any){
      yield put({
          type:LOAD_MY_POST_ERROR,
          error:err.response.data,
      })
  }
}

// take('LOG_IN', logIn)은 'LOG_IN' action이 실행될 때까지 기다린 후 logIn 함수를 실행
// 이벤트 리스너와 유사한 역할
// logIn 함수를 실행할 때 'LOG_IN_REQUEST' action이 매개변수로 전달된다
// take만 쓰면 일회용이므로 while 혹은 takeEvery(takeLatest)를 쓴다
// takeLatest는 다중 클릭 시 마지막 응답만 처리된다. 실수로 여러번 클릭하는 경우를 대처 가능
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

function* watchOauth2Response() {
  yield takeLatest(CHECK_USER_REQUEST, checkUser)
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchLoadPostRequestActrion(){
  yield throttle(3000, LOAD_MY_POST_REQUEST, loadPost)
}

// all은 배열 안에 있는 것들을 모두 동시에 실행
// fork는 비동기 함수 호출
export default function* userSaga() {
  yield all([fork(watchLoadUser), fork(watchOauth2Response), fork(watchLogOut), fork(watchLoadPostRequestActrion)])
}
