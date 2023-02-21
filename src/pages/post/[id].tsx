import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPostRequestAction, deletePostRequestAction } from '@/store/actions/postAction'
import { RootState } from '@/store/reducers'
import { useState } from 'react'
import { OutputData } from '@editorjs/editorjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import wrapper from '@/store/configureStore'
import { END } from 'redux-saga'
import loadable from '@loadable/component'
import InfoModal from '@/components/plugin/searchModal/infoModal'
import backAxios from '@/store/configureBackAxios'
import { LOAD_USER_REQUEST } from '@/store/types'
import { COLORS } from '@/constants/constants'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import styled from 'styled-components'
import PostEditButton from '@/components/post/PostEditButton'
import useTimeConverter from '@/hooks/useTimeConverter'

dayjs.extend(utc)
dayjs.extend(timezone)

const Container = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  @media only screen and (max-width: 810px) {
    .page {
      padding: 24px 16px;
    }
  }
`

const PostContainer = styled.div`
  width: 100%;
  max-width: 762px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Title = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: fit-content;
  font-size: 48px;
  font-weight: 700;
`
const Meta = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 24px;
  font-size: 16px;
  color: ${COLORS.lightblack};
`

const Editor = loadable(() => import('../../components/editor/editor'))

const PostPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { height } = useWindowDimensions()
  const [data, setData] = useState<OutputData>({
    time: 0,
    blocks: [],
    version: '2.26.4',
  })
  const dispatch = useDispatch()
  const { loadPost, loadPostLoading, deletePostLoading, deletePostSuccess } = useSelector(
    (state: RootState) => state.postReducer
  )
  const { me } = useSelector((state: RootState) => state.userReducer)

  // useEffect(() => {
  //   if (id) {
  //     dispatch(loadPostRequestAction({ ids: [id], amount: 1 }))
  //   }
  // }, [id])

  const { UNIXtimeConverter } = useTimeConverter()

  const editPost = useCallback(() => {
    router.push({ pathname: '/write', query: { postId: loadPost.id } }, '/write')
  }, [loadPost])

  const deletePost = useCallback(() => {
    if (loadPost && loadPost.id) {
      dispatch(deletePostRequestAction(loadPost.id))
    }
  }, [loadPost])

  useEffect(() => {
    if (!deletePostLoading && deletePostSuccess && !loadPost) {
      router.push('/')
    }
  }, [deletePostLoading, deletePostSuccess, loadPost])

  return (
    <>
      <Head>
        <title>Addit for Football : post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          {loadPostLoading ? (
            <div> Loading Post... </div>
          ) : !loadPost ? (
            <div>This post does not exist or has been deleted.</div>
          ) : (
            <PostContainer id="postContainer">
              <Title>{loadPost.title}</Title>
              <Meta>{`${loadPost.email}${'\u00A0\u00A0'}|${'\u00A0\u00A0'}${UNIXtimeConverter(
                loadPost.data.time || 0
              )}`}</Meta>
              <Editor
                data={loadPost.data}
                onChange={setData}
                holder="editorjs-container"
                readonly={true}
              />
            </PostContainer>
          )}
          {me === loadPost?.email && <PostEditButton editPost={editPost} deletePost={deletePost} />}
        </Container>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const cookie = context.req ? context.req.headers.cookie : ''
    backAxios.defaults.headers.Cookie = ''
    if (context.req && cookie) backAxios.defaults.headers.Cookie = cookie
    store.dispatch({
      type: LOAD_USER_REQUEST,
    })
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
