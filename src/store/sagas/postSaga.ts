import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Post, PostSummary } from '@/types'
import backAxios from '../configureBackAxios'
import { LOAD_POST_ERROR, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, SAVE_POST_ERROR, SAVE_POST_REQUEST, SAVE_POST_SUCCESS } from '../types'

// all은 배열 안에 있는 것들을 모두 동시에 실행
// fork는 비동기 함수 호출

function savePostAPI(post:Post){
    return backAxios.post("http://localhost:3065/post/save", post)
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

function loatPostAPI(constraint : {}){
    return backAxios.post("/post/load", constraint)
}

function* loadPost(action : any){
    try{
        const result : {data:PostSummary[]} = yield call(loatPostAPI, action.constraint)
        yield put({
            type:LOAD_POST_SUCCESS,
            data:result.data,
        })
    }catch(err : any){
        yield put({
            type:LOAD_POST_ERROR,
            error:err.response.data,
        })
    }
}
function* watchLoadPostRequestActrion(){
    yield takeLatest(LOAD_POST_REQUEST, loadPost)
}
export default function* postSaga() {
    yield all([fork(watchSavePostRequestAction), fork(watchLoadPostRequestActrion)])
}
