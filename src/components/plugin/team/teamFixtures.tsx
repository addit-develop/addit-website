import { TeamStatisticType, TeamType } from '@/types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div``

interface PropsType {
  team: TeamStatisticType
}
const TeamFixtures = ({ team }: PropsType) => {
  return (
    <React.Fragment>
      <Container></Container>
    </React.Fragment>
  )
}

export default TeamFixtures
