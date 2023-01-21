import React from 'react'
import AppLayout from '@/layout/appLayout'
import Head from 'next/head'
import '@/styles/globals.css'

interface AppProps {
  Component: React.ElementType
}

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="축구 전문 에디터" />
        <title>ADDIT for Football</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  )
}

export default App
