import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next/types'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Addit for Football : main</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>this is homepage.</h1>
        <Link href={'/write'}>write page</Link>
        <br />
        <Link href={'/post'}>post page</Link>
      </main>
    </>
  )
}

export default HomePage
