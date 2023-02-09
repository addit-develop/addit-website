import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next/types'
import styles from '@/styles/home.module.css'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMainPostRequestAction } from '@/store/actions/postAction'
import { loadMyPostRequestAction } from '@/store/actions/userAction'
import { PostSummary } from '@/types'
import { RootState } from '@/store/reducers'
import { useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import wrapper from '@/store/configureStore'
import { END } from 'redux-saga'
import backAxios from '@/store/configureBackAxios'
import { LOAD_USER_REQUEST } from '@/store/types'
import { PenIcon } from '@/assets/icons'

dayjs.extend(utc)
dayjs.extend(timezone)

const HomePage: NextPage = () => {
  const dispatch = useDispatch()
  const { mainPosts, loadMainPostLoading } = useSelector((state: RootState) => state.postReducer)
  const { me, myPosts, loadMyPostLoading } = useSelector((state: RootState) => state.userReducer)
  const [toExposePosts, setToExposePosts] = useState<PostSummary[]>(mainPosts ? mainPosts : [])
  const [loadToExpostPosts, setLoadToExpostPosts] = useState<boolean>(false)
  useEffect(() => {
    dispatch(loadMyPostRequestAction({ summary: true, amount: 16, writers: [me] }))
  }, [me])
  useEffect(() => {
    const box = document.getElementById('showMineCheckBox') as HTMLInputElement
    if (me && box && box.checked) {
      setLoadToExpostPosts(loadMyPostLoading)
      setToExposePosts(myPosts ? myPosts : [])
    } else {
      setLoadToExpostPosts(loadMainPostLoading)
      setToExposePosts(mainPosts ? mainPosts : [])
    }
  }, [me, mainPosts, myPosts, loadMainPostLoading, loadMyPostLoading])

  // useEffect(() => { // infinite scroll
  //   function onScroll() {
  //     if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
  //       const box = document.getElementById('showMineCheckBox') as HTMLInputElement;
  //       if(box && box.checked && !loadMyPostLoading){
  //         dispatch(loadMyPostRequestAction({summary : true, amount : 10, writers : [me]}))
  //       }else if(!loadMainPostLoading){
  //         dispatch(loadMainPostRequestAction({summary : true, amount : 10}))
  //       }
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll)
  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //   }
  // }, [])

  const timeConverter = useCallback((UNIX_timestamp: number) => {
    return dayjs(new Date(UNIX_timestamp))
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format('D MMM YYYY | HH:mm')
      .toString()
  }, [])

  const exposeMine = useCallback(() => {
    const box = document.getElementById('showMineCheckBox') as HTMLInputElement
    if (me && box && box.checked) {
      setLoadToExpostPosts(loadMyPostLoading)
      setToExposePosts(myPosts ? myPosts : [])
    } else {
      setLoadToExpostPosts(loadMainPostLoading)
      setToExposePosts(mainPosts ? mainPosts : [])
    }
  }, [me, myPosts, mainPosts])
  return (
    <>
      <Head>
        <title>Addit for Football : main</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {me ? (
          <div className={styles.myPostCheckBox}>
            <div>hello {me}</div>
            <input
              type="checkbox"
              id="showMineCheckBox"
              onClick={exposeMine}
              defaultChecked={false}
            />
            My posts
          </div>
        ) : (
          <></>
        )}
        {toExposePosts.length === 0 ? (
          <div>No Post.</div>
        ) : (
          <div className={styles.postsContainer}>
            {/* {toExposePosts.map((x) => (
              <Link key={x.id} className={styles.postCard} href={`/post/${x.id}`}>
                {x.mainImage ? (
                  <div className={styles.postImage}>
                    <img src={x.mainImage} />
                  </div>
                ) : null}
                <div className={styles.postDetails}>
                  <div className={styles.postTitle}>{x.title}</div>
                  <div className={styles.postSnippet}>{x.snippet}</div>
                  <div className={styles.postUploadInfo}>
                    {x.email}
                    <span>{`${timeConverter(x.time)}`}</span>
                  </div>
                </div>
              </Link>
            ))}
                */}
            <br />
            {loadToExpostPosts ? <div>Loading more Posts</div> : <></>}
          </div>
        )}
        {me ? (
          <Link className={styles.write} href={'/write'}>
            <PenIcon width={24} height={24} fill="#fff" />
            Write
          </Link>
        ) : (
          <></>
        )}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const cookie = context.req ? context.req.headers.cookie : ''
    backAxios.defaults.headers.Cookie = ''
    if (context.req && cookie) backAxios.defaults.headers.Cookie = cookie
    store.dispatch(loadMainPostRequestAction({ summary: true, amount: 16 }))
    store.dispatch({
      type: LOAD_USER_REQUEST,
    })
    store.dispatch(END)
    await store.sagaTask?.toPromise()
    return { props: {} }
  }
)

export default HomePage
