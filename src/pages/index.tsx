import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next/types'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMainPostRequestAction } from '@/store/actions/postAction'
import { loadMyPostRequestAction } from '@/store/actions/userAction'
import { PostSummaryType } from '@/types'
import { RootState } from '@/store/reducers'
import { useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import wrapper from '@/store/configureStore'
import { END } from 'redux-saga'
import backAxios from '@/store/configureBackAxios'
import { LOAD_USER_REQUEST } from '@/store/types'
import WriteButton from '@/components/home/WriteButton'
import PostCard from '@/components/home/PostCard'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import PaginationBar from '@/components/home/PaginationBar'

dayjs.extend(utc)
dayjs.extend(timezone)

const PostContainer = styled.div`
  width: 100%;
  max-width: 1812px;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  padding: 24px 48px 48px;
  margin: 0 auto;
  @media only screen and (max-width: 1500px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 810px) {
    padding: 24px 24px 48px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const MyPostContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1812px;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 0 48px;
  margin: 0 auto;
  @media only screen and (max-width: 810px) {
    padding: 0 24px;
  }
`

const MyPostCheckBox = styled.div`
  flex-shrink: 0;
  width: fit-content;
  display: flex;
  padding: 12px 0;
  gap: 4px;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Manrope';
  font-weight: 500;
  color: ${COLORS.lightblack};
  input {
    width: 16px;
    height: 16px;
  }
`
const UserInfo = styled.div`
  display: flex;
  padding: 12px 0;
  font-family: 'Manrope';
  font-size: 14px;
  font-weight: 600;
  color: #666666;
`

const HomePage: NextPage = () => {
  const dispatch = useDispatch()
  const { mainPosts, loadMainPostLoading } = useSelector((state: RootState) => state.postReducer)
  const { me, myPosts, loadMyPostLoading } = useSelector((state: RootState) => state.userReducer)
  const [postList, setPostList] = useState<PostSummaryType[]>(mainPosts ? mainPosts : [])
  const [loadToExpostPosts, setLoadToExpostPosts] = useState<boolean>(false)
  const [showMyPost, setShowMyPost] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    dispatch(loadMyPostRequestAction({ summary: true, amount: 16 * page, writers: [me] }))
  }, [me, page])

  const exposeMine = useCallback(() => {
    if (me && showMyPost) {
      setLoadToExpostPosts(loadMyPostLoading)
      setPostList(myPosts)
    } else {
      setLoadToExpostPosts(loadMainPostLoading)
      setPostList(mainPosts ? mainPosts : [])
    }
  }, [me, myPosts, mainPosts, showMyPost])

  useEffect(() => {
    exposeMine()
  }, [showMyPost])

  // useEffect(() => { // infinite scroll
  //   function onScroll() {
  //     if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
  //       const box = document.getElementById('showMineCheckBox') as HTMLInputElement;
  //       if(box && box.checked && !loadMyPostLoading){
  //         dispatch(loadMyPostRequestAction({summary : true, amount : 16, writers : [me]}))
  //       }else if(!loadMainPostLoading){
  //         dispatch(loadMainPostRequestAction({summary : true, amount : 16}))
  //       }
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll)
  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //   }
  // }, [])

  return (
    <>
      <Head>
        <title>Addit for Football : main</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Addit for Football : main" />
        <meta property="og:description" content="축구 전문 에디터 플랫폼 Addit for Football" />
        <meta property="og:url" content="http://addit-football.com" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        />
      </Head>
      <main>
        {me && (
          <MyPostContainer>
            <UserInfo>{me}</UserInfo>
            <MyPostCheckBox>
              <input
                type="checkbox"
                onClick={() => setShowMyPost(!showMyPost)}
                defaultChecked={showMyPost}
              />
              My posts
            </MyPostCheckBox>
          </MyPostContainer>
        )}
        <PostContainer>
          {postList.length === 0 ? (
            <div>No Post.</div>
          ) : (
            <>
              {postList.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
              {loadToExpostPosts && <div>Loading more Posts</div>}
            </>
          )}
        </PostContainer>
        <PaginationBar page={page} setPage={setPage} total={Number(postList.length / 16)} />
        {me && <WriteButton />}
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
