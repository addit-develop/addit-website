import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Post, PostSummary } from '@/types'
import backAxios from '../configureBackAxios'
import {
  LOAD_MAIN_POST_ERROR,
  LOAD_MAIN_POST_REQUEST,
  LOAD_MAIN_POST_SUCCESS,
  LOAD_POST_ERROR,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  SAVE_POST_ERROR,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  CHANGE_SELECT_MODE,
  DELETE_POST_REQUEST,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
} from '../types'
import axios from 'axios'

// all은 배열 안에 있는 것들을 모두 동시에 실행
// fork는 비동기 함수 호출

function savePostAPI(post: Post) {
  return backAxios.post('/post/save', post)
}

function* savePost(action: any) {
  try {
    const result: { data: any } = yield call(savePostAPI, action.post)
    yield put({
      type: CHANGE_SELECT_MODE,
      data: false,
    })
    yield put({
      type: SAVE_POST_SUCCESS,
      data: result.data,
    })
  } catch (err: any) {
    yield put({
      type: SAVE_POST_ERROR,
      error: err.response.data,
    })
  }
}

function* watchSavePostRequestAction() {
  yield takeLatest(SAVE_POST_REQUEST, savePost)
}

function loadPostAPI(constraint: {}) {
  return backAxios.post('/post/load', constraint)
}

function* loadPost(action: any) {
  try {
    const result: { data: Post[] } = yield call(loadPostAPI, action.constraint)
    yield put({
      type: CHANGE_SELECT_MODE,
      data: false,
    })
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    })
  } catch (err: any) {
    yield put({
      type: LOAD_POST_ERROR,
      error: err.response.data,
    })
  }
}
function* watchLoadPostRequestActrion() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

function loadMainPostAPI(constraint: {}) {
  return backAxios.post('/post/load', constraint)
}

function* loadMainPost(action: any) {
  try {
    const result: { data: PostSummary[] } = yield call(loadMainPostAPI, action.constraint)
    yield put({
      type: LOAD_MAIN_POST_SUCCESS,
      data: result.data,
    })
  } catch (err: any) {
    yield put({
      type: LOAD_MAIN_POST_ERROR,
      error: err.response.data,
    })
  }
}
function* watchLoadMainPostRequestAction() {
  yield takeLatest(LOAD_MAIN_POST_REQUEST, loadMainPost)
}


function deletePostAPI(postId : number) {
  return backAxios.post('/post/delete', postId)
}
function* deletePost(action : any) {
  try{
    yield call(deletePostAPI, action.postId)
    yield put({
      type: DELETE_POST_SUCCESS,
    })
  }catch(err : any){
    yield put({
      type: DELETE_POST_ERROR,
      data: err.response.data,
    })
  }
}
function* watchDeletePostRequestAction() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost)
}

export default function* postSaga() {
  yield all([
    fork(watchSavePostRequestAction),
    fork(watchLoadPostRequestActrion),
    fork(watchLoadMainPostRequestAction),
    fork(watchDeletePostRequestAction),
  ])
}
