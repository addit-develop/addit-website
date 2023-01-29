import { TeamType } from '@/types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div``

interface PropsType {
  team: TeamType
}
const TeamTable = ({ team }: PropsType) => {
  return (
    <React.Fragment>
      <Container></Container>
    </React.Fragment>
  )
}

export default TeamTable
