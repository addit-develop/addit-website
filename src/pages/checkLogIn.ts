import { useDispatch, useSelector } from 'react-redux'
import rootReducer, { RootState } from '@/store/reducers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { oauthResponseSuccessAction, oauthResponseFailAction } from '@/store/actions/userAction'
// this page is for checking Login result.
// Don't render this page, userInfo included.


const CheckLogInMiddleware = () => {
  const router = useRouter()
  const dispatch = useDispatch()  
  const {code, state, error} = router.query;
  const { me, logInDone } = useSelector((state: RootState) => state.userReducer)

  useEffect(() => {
    if(error){
      console.log('access denied')
      dispatch(oauthResponseFailAction(error))
    }else if(code && state){
      console.log('access confirmed')
      dispatch(oauthResponseSuccessAction({code:code, state:state}))
    }
  }, [code, error]);

  useEffect(() => {
    if(logInDone){
      router.replace('/', undefined, {shallow:true})
    }
  }, [logInDone])
}

export default CheckLogInMiddleware
  