import { TeamStatisticType, TeamType } from '@/types'
import React from 'react'
import styled from 'styled-components'
import LeagueStanding from '../common/leagueStanding'

const Container = styled.div``

interface PropsType {
  team: TeamStatisticType
  season: number
  setData?: any
}
const TeamTable = ({ team, season, setData }: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        <LeagueStanding
          season={season}
          league={team.league}
          selectedTeam={team.team}
          setData={(data: any) => setData(data)}
        />
      </Container>
    </React.Fragment>
  )
}

export default TeamTable
