import { useDispatch, useSelector } from 'react-redux'
import rootReducer, { RootState } from '@/store/reducers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { oauthResponseSuccessAction, oauthResponseFailAction } from '@/store/actions/userAction'
// this page is for checking Login result.
// Don't render this page, userInfo included.


const CheckLogInMiddleware = () => {
  var router = useRouter()
  var {code, state, error, scope} = router.query;
  const { me, logInLoading, logInError, loginData } = useSelector((state: RootState) => state.userReducer)
  useEffect(() => {
    router.replace('/', undefined, {shallow:true})
  }, [logInLoading])
  const dispatch = useDispatch()  

  useEffect(() => {
    console.log(state)
    console.log(loginData)
    if(error || state !== loginData){
      console.log('state incorrect')
      dispatch(oauthResponseFailAction(error))
    }
    else if(code){
      dispatch(oauthResponseSuccessAction({'code':code}))
    }
  }, [code, error, loginData, state])
}

export default CheckLogInMiddleware
  