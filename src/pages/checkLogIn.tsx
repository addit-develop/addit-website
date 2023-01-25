import Head from 'next/head'
import { NextPage } from 'next/types'
import { useParams } from 'react-router-dom';
import LoginFailedPage from './logInFailed';
import UserPage from './user';

// this page is for checking Login result.
// Don't render this page, userInfo included.

const CheckLogInPage = () => {
    const {error, state, code, scope, authuser} = useParams()
    console.log(scope, authuser, error)
    if(error){
        return( // 지금은 렌더링하게 해놨지만 바로 다른 페이지로 이동시켜야 함
          <>
            <Head>
              <title>Addit for Football : post</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
              <h1>Login Failed.</h1>
            </main>
          </>)
    }
    return( // 지금은 렌더링하게 해놨지만 바로 다른 페이지로 이동시켜야 함
      <>
        <Head>
          <title>Addit for Football : post</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>Login Success</h1>
        </main>
      </>

    )
  }
  
  export default CheckLogInPage
  