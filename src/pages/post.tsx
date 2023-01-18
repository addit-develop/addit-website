import Head from 'next/head'
import { NextPage } from 'next/types'

const PostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Addit for Football</title>
        <meta name="description" content="Addit for Football" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>this is PostPage.</h1>
      </main>
    </>
  )
}

export default PostPage
