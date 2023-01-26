import produce from 'immer'

import {
  CHECK_LOGINED_USER_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from '../types'

type StateType = {
  logined: boolean
  logInLoading: boolean //로그인 시도 중
  logInError: string | null
  checkingUser: boolean | null
  logOutDone: boolean
  logOutLoading: boolean //로그아웃 시도 중
  logOutError: string | null
  me: string | null
  signUpData: any
  loginData: string | null
}

export const initialState: StateType = {
  logined: false,
  logInLoading: false, //로그인 시도 중
  logInError: null,
  checkingUser: false,
  logOutDone: false,
  logOutLoading: false, //로그아웃 시도 중
  logOutError: null,
  me: null,
  signUpData: {},
  loginData: null,
}

const userReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true
        draft.logInError = null
        draft.logined = false
        draft.loginData = action.data
        break
      case  CHECK_LOGINED_USER_REQUEST:
        draft.checkingUser = true
        break
      case LOG_IN_SUCCESS:
        draft.logInLoading = false
        draft.logined = true
        draft.checkingUser = false
        draft.me = action.data['nickname']
        break
      case LOG_IN_FAILURE:
        draft.checkingUser = false
        draft.logInLoading = false
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
        break
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false
        draft.logOutError = action.error
        break
      default:
        break
    }
  })

export default userReducer
