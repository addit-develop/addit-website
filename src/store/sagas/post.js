import { all, fork, call, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios'

import { SET_BLOCK_TYPE, SET_BLOCK_DATA } from '../reducers/post'

// all은 배열 안에 있는 것들을 모두 동시에 실행
// fork는 비동기 함수 호출
export default function* userSaga() {}
