import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { changeModalPage } from '@/store/actions/pageAction'
import { LeagueType, TeamType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import TeamDetailTitle from './teamDetailTitle'
import MajorLeagues from '@/data/majorLeaguesData.json'
import LeagueGroupedTeams from './leagueGroupedTeams'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.white};
  overflow-y: scroll;
`
const SearchAny = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface PropsType {
  // searchRef: any
}
const TeamHome = ({}: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        {MajorLeagues.map((l) => {
          return <LeagueGroupedTeams league={l} key={l.id} />
        })}
      </Container>
    </React.Fragment>
  )
}
export default TeamHome
