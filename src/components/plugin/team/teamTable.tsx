import { TeamStatisticType, TeamType } from '@/types'
import React from 'react'
import styled from 'styled-components'
import LeagueStanding from '../common/leagueStanding'

const Container = styled.div``

interface PropsType {
  team: TeamStatisticType
  season: number
}
const TeamTable = ({ team, season }: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        <LeagueStanding season={season} league={team.league} selectedTeam={team.team} />
      </Container>
    </React.Fragment>
  )
}

export default TeamTable
