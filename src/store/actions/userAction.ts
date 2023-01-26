import { LOG_IN_REQUEST, LOG_OUT_REQUEST, CHECK_LOGINED_USER_REQUEST, LOG_IN_FAILURE } from '../types'

// action creator
export const loginRequestAction = (data : string) => {
  console.log(data)
  return {
    type: LOG_IN_REQUEST,
    data: data
  }
}

export const oauthResponseFailAction = (error : any) => { // google oauth2 login failed
  return {
    type: LOG_IN_FAILURE,
    error : error    
  }
}

export const oauthResponseSuccessAction = (data : {'code': any}) => { // google oauth2 login succed and requsting back for confirm user
  return {
    type: CHECK_LOGINED_USER_REQUEST,
    data: data
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
}