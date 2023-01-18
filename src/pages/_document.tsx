import Banner from '@/components/banner/banner'
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Addit for Football" />
        {/* 여기의 메타태그는 모든 페이지에 공통적으로 적용 */}
      </Head>
      <body>
        <Banner />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
export default Document
