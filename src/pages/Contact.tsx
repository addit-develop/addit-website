import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const ContactPage = () => {
  return (
    <Container>
      <div> Email ✉️ addit.develop@gmail.com </div>
    </Container>
  )
}
export default ContactPage
