import { useDispatch, useSelector } from 'react-redux'
import rootReducer, { RootState } from '@/store/reducers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { oauthResponseSuccessAction, oauthResponseFailAction } from '@/store/actions/userAction'
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types'
import wrapper from '@/store/configureStore'
import { END } from 'redux-saga'
// this page is for checking Login result.
// Don't render this page, userInfo included.

const CheckLogInMiddleware = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { me, logInDone } = useSelector((state: RootState) => state.userReducer)
  // const { code, state, error } = router.query

  // useEffect(() => {
  //   if (error) {
  //     console.log('access denied')
  //     dispatch(oauthResponseFailAction(error))
  //   } else if (code && state) {
  //     console.log('access confirmed')
  //     dispatch(oauthResponseSuccessAction({ code: code, state: state }))
  //   }
  // }, [code, error, state])

  useEffect(() => {
    if (logInDone) {
      router.replace('/', undefined, { shallow: true })
    }
  }, [logInDone])

  return <div>LogIn Loading...</div>
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const { code, state, error } = context.query

    if (error) {
      console.log('access denied')
      store.dispatch(oauthResponseFailAction(error))
    } else if (code && state) {
      console.log('access confirmed')
      store.dispatch(oauthResponseSuccessAction({ code: code, state: state }))
    }

    store.dispatch(END)
    await store.sagaTask?.toPromise()

    return { props: {} }
  }
)

export default CheckLogInMiddleware
