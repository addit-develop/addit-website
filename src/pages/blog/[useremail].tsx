import PaginationBar from '@/components/home/PaginationBar'
import PostCard from '@/components/home/PostCard'
import WriteButton from '@/components/home/WriteButton'
import { COLORS } from '@/constants/constants'
import { loadMainPostRequestAction } from '@/store/actions/postAction'
import backAxios from '@/store/configureBackAxios'
import wrapper from '@/store/configureStore'
import { RootState } from '@/store/reducers'
import { LOAD_USER_REQUEST } from '@/store/types'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

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
  justify-content: start;
  align-items: center;
  padding: 12px 48px;
  margin: 0 auto;
  gap: 8px;
  font-family: 'Manrope';
  font-size: 18px;
  font-weight: 800;
  color: ${COLORS.black};
  @media only screen and (max-width: 810px) {
    padding: 12px 24px;
  }
`
const UserInfo = styled.div`
  display: flex;
  font-weight: 500;
  color: ${COLORS.lightblack};
`

const BlogPage: NextPage = () => {
  const router = useRouter()
  const { useremail } = router.query

  const dispatch = useDispatch()
  const { mainPosts, loadMainPostLoading } = useSelector((state: RootState) => state.postReducer)
  const { me } = useSelector((state: RootState) => state.userReducer)
  const [loadToExpostPosts, setLoadToExpostPosts] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    dispatch(loadMainPostRequestAction({ writers: [useremail], summary: true, amount: 16 * page }))
  }, [useremail, page])

  return (
    <>
      <Head>
        <title>{`Addit for Football : Blog of ${useremail}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={`Addit for Football : Blog of ${useremail}`} />
        <meta property="og:description" content={`${useremail}님의 블로그입니다.`} />
        <meta property="og:url" content={'http://addit-football.com/blog/' + useremail} />
        {/* <meta property="og:image" content={loadPost?.mainImage} /> */}
      </Head>
      <main>
        <MyPostContainer>
          Blog of
          <UserInfo>{useremail}</UserInfo>
        </MyPostContainer>
        <PostContainer>
          {mainPosts.length === 0 ? (
            <div>No Post.</div>
          ) : (
            <>
              {mainPosts.map((post: any) => (
                <PostCard post={post} key={post.id} />
              ))}
              {loadToExpostPosts && <div>Loading more Posts</div>}
            </>
          )}
        </PostContainer>
        <PaginationBar page={page} setPage={setPage} total={Number(mainPosts.length / 16)} />
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

    const { useremail } = context.query

    store.dispatch(loadMainPostRequestAction({ writers: [useremail], summary: true, amount: 16 }))
    store.dispatch({
      type: LOAD_USER_REQUEST,
    })
    store.dispatch(END)
    await store.sagaTask?.toPromise()
    return { props: {} }
  }
)

export default BlogPage
