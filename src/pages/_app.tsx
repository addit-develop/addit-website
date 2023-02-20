import React, { useEffect } from 'react'
import AppLayout from '@/layout/appLayout'
import Head from 'next/head'
import '@/styles/globals.css'
import wrapper from '../store/configureStore'
import Script from 'next/script'
import { useRouter } from 'next/router'

interface AppProps {
  Component: React.ElementType
}

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="축구 전문 에디터" />
        <meta
          name="google-site-verification"
          content="M0Ecq8WUxpkRQTXp4LDyvt-_-0Qr6wnYECJodk2FXTM"
        />
        <title>ADDIT for Football</title>
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  )
}

export default wrapper.withRedux(App)
