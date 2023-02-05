import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { RootState } from '@/store/reducers'
import { LeagueType, StandingDataType, TeamType } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import LeagueStandingTeam from '../league/leagueStandingTeam'
import SelectBox from '../common/selectBox'

const Container = styled.div`
  position: relative;
  margin-top: 2px;
  padding: 6px 8px 6px 8px;
  background-color: ${COLORS.white};
  border-radius: 10px;
`
const StandingIndex = styled.div`
  display: flex;
  flex-direction: row;
  height: 24px;
  gap: 12px;
  color: ${COLORS.darkgray};
  justify-content: flex-end;
  font-size: 12px;
`
const Index = styled.div`
  width: 16px;
  text-align: center;
`
interface PropsType {
  league: LeagueType
  season: number
  selectedTeam?: TeamType
  setData?: any
}

const LeagueStanding = ({ league, season, selectedTeam, setData }: PropsType) => {
  const [standingData, setStandingData] = useState<StandingDataType[]>([])
  const dispatch = useDispatch()
  const axios = useAxios()

  const { selectMode } = useSelector((state: RootState) => state.pageReducer)
  const [selected, setSelected] = useState<boolean>(false)

  const getStandingData = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/standings', { params: { league: league.id, season } })
    if (res.data.response) {
      setStandingData(res.data.response[0].league.standings[0])
      dispatch(loadDataFinish())
    }
  }

  useEffect(() => {
    getStandingData()
  }, [season])

  const onSelected = useCallback(() => {
    if (!selected)
      setData({ standingData: standingData, leagueId: league.id, selectedTeamId: selectedTeam?.id })
    else setData()
    setSelected(!selected)
  }, [standingData, selected])

  if (!standingData) return null
  return (
    <React.Fragment>
      <Container>
        <SelectBox selectMode={selectMode} selected={selected} onClick={onSelected} />
        <StandingIndex>
          <Index>PL</Index>
          <Index>W</Index>
          <Index>D</Index>
          <Index>L</Index>
          <Index>GD</Index>
          <Index>PTS</Index>
        </StandingIndex>
        {standingData.map((team, i) => {
          return (
            <LeagueStandingTeam
              team={team}
              leagueId={league.id}
              key={i}
              selected={team.team.id === selectedTeam?.id}
            />
          )
        })}
      </Container>
    </React.Fragment>
  )
}

export default LeagueStanding
