import { PostSummary } from '@/types'
import produce from 'immer'

import {
  CHECK_USER_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_MY_POST_REQUEST,
  LOAD_MY_POST_SUCCESS,
  LOAD_MY_POST_ERROR,
} from '../types'

type StateType = {
  loadUserLoading: boolean
  loadUserDone: boolean
  loadUserError: any | null

  logInError: any | null
  checkingUser: boolean | null
  logInDone: boolean
  me: string | null

  logOutDone: boolean
  logOutLoading: boolean
  logOutError: any | null

  loadMyPostLoading: boolean
  loadMyPostSuccess: boolean
  loadMyPostError: any | null
  myPosts: PostSummary[]
}

export const initialState: StateType = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,

  logInError: null,
  checkingUser: false,
  logInDone: false,

  me: null,

  logOutDone: false,
  logOutLoading: false, //로그아웃 시도 중
  logOutError: null,

  loadMyPostLoading: false,
  loadMyPostSuccess: false,
  loadMyPostError: null,
  myPosts: [],
}

const userReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_USER_REQUEST: // load user when F5
        draft.loadUserLoading = true
        draft.loadUserError = null
        draft.loadUserDone = false
        break
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false
        draft.loadUserDone = true
        draft.me = action.data
        break
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false
        draft.loadUserError = action.error
        break
      case CHECK_USER_REQUEST: // checking user in oauth2 response from back
        draft.checkingUser = true
        break
      case LOG_IN_SUCCESS:
        draft.logInDone = true
        draft.checkingUser = false
        draft.me = action.data
        break
      case LOG_IN_FAILURE:
        draft.checkingUser = false
        draft.logInDone = true
        draft.logInError = action.error
        break
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true
        draft.logOutError = null
        draft.logOutDone = false
        break
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false
        draft.logOutDone = true
        draft.me = null
        draft.myPosts = []
        break
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false
        draft.logOutError = action.error
        break
      case LOAD_MY_POST_REQUEST:
        draft.loadMyPostLoading = true
        draft.loadMyPostSuccess = false
        draft.loadMyPostError = null
        draft.myPosts = []
        break
      case LOAD_MY_POST_SUCCESS:
        draft.loadMyPostLoading = false
        draft.loadMyPostSuccess = true
        draft.myPosts = action.data
        break
      case LOAD_MY_POST_ERROR:
        draft.loadMyPostLoading = false
        draft.loadMyPostError = action.error
        break
      default:
        break
    }
  })

export default userReducer
