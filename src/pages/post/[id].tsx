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
import backAxios from '@/store/configureBackAxios'
import { LOAD_USER_REQUEST } from '@/store/types'
import { COLORS } from '@/constants/constants'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import styled from 'styled-components'
import PostEditButton from '@/components/post/PostEditButton'
import useTimeConverter from '@/hooks/useTimeConverter'
import Link from 'next/link'
import html2canvas from 'html2canvas'
import PostShareModal from '@/components/post/PostShareModal'
import { MenuIcon, ShareNodeIcon } from '@/assets/icons'

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
  word-break: break-all;
  @media only screen and (max-width: 810px) {
    font-size: 28px;
  }
`
const Meta = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 24px;
  font-size: 16px;
  color: ${COLORS.lightblack};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const ShareButton = styled.button`
  display: flex;
  flex-direction: row;
  color: ${COLORS.darkgray};
  gap: 5px;
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
  const { UNIXtimeConverter } = useTimeConverter()
  const [shareModalVisible, setShareModalVisible] = useState(false)
  const [copyLoading, setCopyLoading] = useState(false)
  const editPost = useCallback(() => {
    router.push({ pathname: '/write', query: { postId: loadPost.id } }, '/write')
  }, [loadPost])

  const deletePost = useCallback(() => {
    if (loadPost && loadPost.id) {
      dispatch(deletePostRequestAction(loadPost.id))
    }
  }, [loadPost])

  const onClickShareUrl = () => {
    navigator.clipboard.writeText(`http://addit-football.com/post/${id}`).then(() => {
      alert('본문 링크가 클립보드에 복사되었습니다!')
    })
  }

  const copyElementsToClipboard = async (elements: Element[]) => {
    const promises = elements.map(async (element) => {
      const canvas = await html2canvas(element as HTMLElement)
      const imageBlob = canvas.toDataURL('image/png').split(',')[1]
      const decodedImage = new TextDecoder().decode(
        Uint8Array.from(atob(imageBlob), (c) => c.charCodeAt(0))
      )
      return new Blob([decodedImage], { type: 'image/png' })
    })
    const blobs = await Promise.all(promises)
    const clipboardItems = blobs.map((blob) => new ClipboardItem({ 'image/png': blob }))
    await navigator.clipboard.write(clipboardItems)
    setCopyLoading(false)
    alert('본문 복사 완료')
  }

  const onClickShareContent = () => {
    console.log('본문 복사 시작')
    setCopyLoading(true)
    const postContainer = document.getElementById('postContainer')
    if (!postContainer) return null
    const blockList = Array.from(postContainer.getElementsByClassName('ce-block__content'))

    copyElementsToClipboard(blockList)
  }

  useEffect(() => {
    if (!deletePostLoading && deletePostSuccess && !loadPost) {
      router.push('/')
    }
  }, [deletePostLoading, deletePostSuccess, loadPost])

  return (
    <>
      <Head>
        <title>
          {loadPost ? `${loadPost.title} : Addit for Football` : `Addit for Football : Post`}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={loadPost?.title + ' : Addit for Football'} />
        <meta property="og:description" content="Addit for Football에서 작성된 글입니다." />
        <meta property="og:url" content={'http://addit-football.com/post/' + id} />
        <meta property="og:image" content={loadPost?.mainImage} />
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
              <Meta>
                <div>
                  <Link href={`/blog/${loadPost.email}`}>{loadPost.email}</Link>
                  {`${'\u00A0\u00A0'}|${'\u00A0\u00A0'}${UNIXtimeConverter(
                    loadPost.data.time || 0
                  )}`}
                </div>
                <ShareButton onClick={() => setShareModalVisible(!shareModalVisible)}>
                  <ShareNodeIcon fill={COLORS.darkgray} />
                  <div style={{ whiteSpace: 'nowrap' }}>공유하기</div>
                </ShareButton>
                {shareModalVisible && (
                  <PostShareModal
                    onClickShareContent={() => {
                      alert('준비중입니다.')
                      // onClickShareContent()
                      setShareModalVisible(!shareModalVisible)
                    }}
                    onClickShareUrl={() => {
                      onClickShareUrl()
                      setShareModalVisible(!shareModalVisible)
                    }}
                  />
                )}
              </Meta>
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
