import { COLORS } from '@/constants/constants'
import { LeagueType, TeamType } from '@/types'
import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${COLORS.white};
  width: 100%;
  height: 60px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const TeamName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
`
const LeagueName = styled.div`
  font-size: 14px;
  color: ${COLORS.gray};
  margin-left: auto;
`
interface PropsType {
  team: TeamType
  league: LeagueType
}

const TeamDetailTitle = ({ team, league }: PropsType) => {
  return (
    <Container>
      <Image src={team.logo} width={40} height={40} alt={team.name} />
      <TeamName>{team.name}</TeamName>
      <LeagueName>{league.name}</LeagueName>
    </Container>
  )
}
export default TeamDetailTitle
