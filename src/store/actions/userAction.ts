import { LOG_OUT_REQUEST, CHECK_USER_REQUEST, LOG_IN_FAILURE } from '../types'
import backAxios from '../configureBackAxios'


// action creator
export const loginRequestAction = async () => {
  try {
    const result = await backAxios.get("/auth/login") // get google oauth2 login url from back
    return `https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20email%20profile&access_type=offline&response_type=code&state=${result.data['state']}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CALLBACK_URL}&client_id=${result.data['client_id']}`
  } catch (err) {
    return null // if err return null for url
  }
}

export const oauthResponseFailAction = (error : any) => { // google oauth2 login failed
  return {
    type: LOG_IN_FAILURE,
    error : error    
  }
}

export const oauthResponseSuccessAction = (data : {code:string | string[], state:string | string[]}) => { // google oauth2 login succed and requsting back for confirm user
  return {
    type: CHECK_USER_REQUEST,
    data: data
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
}