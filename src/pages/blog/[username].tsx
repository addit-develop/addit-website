import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

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

const BlogPage: NextPage = () => {
  const router = useRouter()
  const { username } = router.query
  return (
    <>
      <Head>
        <title>{`Addit for Football : Blog of ${username}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={`Addit for Football : Blog of ${username}`} />
        <meta property="og:description" content={`${username}님의 블로그입니다.`} />
        <meta property="og:url" content={'http://addit-football.com/blog/' + username} />
        {/* <meta property="og:image" content={loadPost?.mainImage} /> */}
      </Head>
      <main>
        <Container></Container>
      </main>
    </>
  )
}

export default BlogPage
