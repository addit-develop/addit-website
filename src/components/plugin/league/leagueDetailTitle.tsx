import { LeagueType } from '@/types'
import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import MenuBar from '../common/menuBar'

interface PropsType {
  league: LeagueType
}

const Container = styled.div`
  background-color: ${COLORS.white};
  width: 100%;
  height: 60px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LeagueTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
`
const LeagueDetailTitle = ({ league }: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        <Image src={league.logo} height={40} width={40} alt={league.name} />
        <LeagueTitle>{league.name}</LeagueTitle>
      </Container>
    </React.Fragment>
  )
}
export default LeagueDetailTitle
