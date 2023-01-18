import Head from 'next/head'
import { NextPage } from 'next/types'

const PostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Addit for Football : post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>this is PostPage.</h1>
      </main>
    </>
  )
}

export default PostPage
