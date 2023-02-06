import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next/types'
import styles from '@/styles/post.module.css'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPostAction, loadPostRequestAction } from '@/store/actions/postAction'
import { RootState } from '@/store/reducers'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { OutputData } from '@editorjs/editorjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import wrapper from '@/store/configureStore'
import { END } from 'redux-saga'

dayjs.extend(utc)
dayjs.extend(timezone)

const Editor = dynamic(() => import('../../components/editor/editor'), {
  ssr: true,
})

const PostPage: NextPage = () => {
  const [data, setData] = useState<OutputData>({
    time: 0,
    blocks: [],
    version: '2.26.4',
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const { post, loadPostLoading } = useSelector((state: RootState) => state.postReducer)
  const { me } = useSelector((state: RootState) => state.userReducer)

  const timeConverter = useCallback((UNIX_timestamp: number) => {
    return dayjs(new Date(UNIX_timestamp))
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format('D MMM YYYY | HH:mm')
      .toString()
  }, [])

  const editPost = useCallback(() => {
    dispatch(editPostAction())
    router.push('/write')
  }, [])

  return (
    <>
      <Head>
        <title>Addit for Football : post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.page}>
          {loadPostLoading ? <div> Loading Post... </div> : <></>}
          {!loadPostLoading && post ? (
            <div className={styles.postContainer} id="postContainer">
              <div className={styles.title}>{post.title}</div>
              <div className={styles.detail}>{`${
                post.email
              }${'\u00A0\u00A0'}|${'\u00A0\u00A0'}${timeConverter(post.data.time || 0)}`}</div>
              <Editor
                data={post.data}
                onChange={setData}
                holder="editorjs-container"
                readonly={true}
              />
            </div>
          ) : (
            <div>This post does not exist or has been deleted.</div>
          )}
          {!loadPostLoading && post && me === post.email ? (
            <button className={styles.edit} onClick={editPost}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path
                  d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"
                  fill="#fff"
                />
              </svg>
              Edit
            </button>
          ) : (
            <></>
          )}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const { id } = context.query

    if (id) {
      store.dispatch(loadPostRequestAction({ ids: [id], amount: 1 }))
    }

    store.dispatch(END)
    await store.sagaTask?.toPromise()

    return { props: {} }
  }
)

export default PostPage
