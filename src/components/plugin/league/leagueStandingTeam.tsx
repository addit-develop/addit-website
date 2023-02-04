import { COLORS } from '@/constants/constants'
import { changeModalPage } from '@/store/actions/pageAction'
import { RootState } from '@/store/reducers'
import { StandingDataType, TeamStatType } from '@/types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CircledImage from '../common/circledImage'

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  border-bottom: 1px ${COLORS.lightgray} solid;
  color: ${COLORS.drakblack};
`
const Rank = styled.div`
  width: 18px;
`

const TeamName = styled.div`
  flex: 1;
`
const TeamStat = styled.div<{ points?: boolean }>`
  width: 16px;
  text-align: center;
  color: ${(props) => props.points && COLORS.blue};
  font-weight: ${(props) => props.points && 'bold'};
`

interface PropsType {
  team: StandingDataType
  leagueId: number
}

const LeagueStandingTeam = ({ team, leagueId }: PropsType) => {
  const dispatch = useDispatch()
  const { currentPage, currentMenu, pageProps } = useSelector(
    (state: RootState) => state.pageReducer
  )

  return (
    <React.Fragment>
      <Container
        onClick={() => {
          dispatch(
            changeModalPage('teamDetail', 'Teams', { teamId: team.team.id, leagueId: leagueId })
          )
        }}
      >
        <Rank>{team.rank}</Rank>
        <CircledImage src={team.team.logo} width={24} height={24} />
        <TeamName>{team.team.name}</TeamName>
        <TeamStat>{team.all.played}</TeamStat>
        <TeamStat>{team.all.win}</TeamStat>
        <TeamStat>{team.all.draw}</TeamStat>
        <TeamStat>{team.all.lose}</TeamStat>
        <TeamStat>{team.goalsDiff}</TeamStat>
        <TeamStat points={true}>{team.points}</TeamStat>
      </Container>
    </React.Fragment>
  )
}

export default LeagueStandingTeam
