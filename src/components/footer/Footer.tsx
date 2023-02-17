import { COLORS } from '@/constants/constants'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 60px 100px 30px 100px;
  @media only screen and (max-width: 810px;) {
    padding: 60px 24px 30px 24px;
  }
`

const InnerContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: ${COLORS.lightblack};
  border-top: 1px ${COLORS.lightgray} solid;
`
const Title = styled.div`
  font-weight: 900;
`
const Email = styled.span`
  margin-left: 10px;
  font-weight: 400;
`
const Footer = () => {
  return (
    <Container>
      <InnerContainer>
        <Title>
          Made by ADDIT
          <Email>addit.dev@gmail.com</Email>
        </Title>
      </InnerContainer>
    </Container>
  )
}

export default Footer
