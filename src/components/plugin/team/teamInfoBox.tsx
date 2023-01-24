import { COLORS } from '@/constants/constants'
import { TeamType } from '@/types'
import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: row;
`
const TeamName = styled.div`
  font-size: 20;
  font-weight: bold;
`
interface PropsType {
  team: TeamType
}

const TeamInfoBox = ({ team }: PropsType) => {
  return (
    <Container>
      <Image src={team.logo} width={40} height={40} alt={team.name} />
      <TeamName>{team.name}</TeamName>
    </Container>
  )
}
export default TeamInfoBox
