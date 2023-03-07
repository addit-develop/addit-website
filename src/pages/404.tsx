import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const Custom404Page = () => {
  return (
    <Container>
      <div>404 Error - Page not found</div>
      <div>
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    </Container>
  )
}
export default Custom404Page
