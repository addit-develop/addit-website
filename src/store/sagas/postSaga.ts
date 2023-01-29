import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Post } from '@/types'
import axios from 'axios'
import { SAVE_POST_ERROR, SAVE_POST_REQUEST, SAVE_POST_SUCCESS } from '../types'

// all은 배열 안에 있는 것들을 모두 동시에 실행
// fork는 비동기 함수 호출

function savePostAPI(post:Post){
    return axios.post("http://localhost:3065/post/save", post)
}

function* savePost(action:any){
    try{
        const result : {data:any} = yield call(savePostAPI, action.post)
        yield put({
            type: SAVE_POST_SUCCESS,
            data:result.data,
        })
    } catch(err:any){
        yield put({
            type: SAVE_POST_ERROR,
            error:err.response.data,
        })
    }

}

function* watchSavePostRequestAction(){
    yield takeLatest(SAVE_POST_REQUEST, savePost)
}

export default function* postSaga() {
    yield all([fork(watchSavePostRequestAction)])
}
