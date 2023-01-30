import { TeamType } from '@/types'
import React from 'react'
import styled from 'styled-components'
import LeagueStanding from '../league/leagueStanding'

const Container = styled.div``

interface PropsType {
  team: TeamType
  leagueId: number
}
const TeamTable = ({ team }: PropsType) => {
  return (
    <React.Fragment>
      <Container></Container>
    </React.Fragment>
  )
}

export default TeamTable
