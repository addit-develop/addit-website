import produce from 'immer'

import {
  CHECK_USER_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from '../types'

type StateType = {
  logInError: string | null
  checkingUser: boolean | null
  logInDone: boolean

  me: string | null

  logOutDone: boolean
  logOutLoading: boolean //로그아웃 시도 중
  logOutError: string | null
}

export const initialState: StateType = {
  logInError: null,
  checkingUser: false,
  logInDone: false,

  me: null,

  logOutDone: false,
  logOutLoading: false, //로그아웃 시도 중
  logOutError: null,
}

const userReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHECK_USER_REQUEST: // checking user in oauth2 response from back
        draft.checkingUser = true
        break
      case LOG_IN_SUCCESS:
        draft.logInDone = true
        draft.checkingUser = false
        draft.me = action.data['nickname']
        break
      case LOG_IN_FAILURE:
        draft.checkingUser = false
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
