import { LOG_IN_REQUEST, LOG_OUT_REQUEST, LoginBody } from '../types'

// action creator
export const loginRequestAction = (data: LoginBody) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
}
