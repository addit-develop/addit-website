import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { RootState } from '@/store/reducers'
import { LeagueType, PlayerDataType, PlayerType, StatisticsType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import PlayerInfoBox from '../common/playerInfoBox'
import SelectBox from '../common/selectBox'

export const Container = styled.div`
  position: relative;
  background-color: ${COLORS.white};
  padding: 0px 8px;
  margin-top: 2px;
  border-radius: 10px;
`
export const Index = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 12px 0px;
`
export const ViewMore = styled.div`
  padding: 10px 8px;
  font-size: 14px;
  color: ${COLORS.darkgray};
  text-align: center;
`
interface PropsType {
  league: LeagueType
  season: number
  setData?: any
}

const LeagueStats = ({ league, season, setData }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const { selectMode } = useSelector((state: RootState) => state.pageReducer)

  const [topScorerList, setTopScorerList] = useState<PlayerDataType[]>([])
  const [topAssistList, setTopAssistList] = useState<PlayerDataType[]>([])
  const [topYellowCardList, setTopYellowCardList] = useState<PlayerDataType[]>([])
  const [topRedCardList, setTopRedCardList] = useState<PlayerDataType[]>([])

  const [topScorerOpen, setTopScorerOpen] = useState<boolean>(false)
  const [topAssistOpen, setTopAssistOpen] = useState<boolean>(false)
  const [topYellowCardOpen, setTopYellowCardOpen] = useState<boolean>(false)
  const [topRedCardOpen, setTopRedCardOpen] = useState<boolean>(false)

  const [topScorerSelected, setTopScorerSelected] = useState<boolean>(false)
  const [topAssistSelected, setTopAssistSelected] = useState<boolean>(false)
  const [topYellowCardSelected, setTopYellowCardSelected] = useState<boolean>(false)
  const [topRedCardSelected, setTopRedCardSelected] = useState<boolean>(false)

  const getTopScorer = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/players/topscorers', { params: { league: league.id, season } })
    setTopScorerList(res.data.response)
    dispatch(loadDataFinish())
  }

  const getTopAssist = async () => {
    const res = await axios.get('/players/topassists', { params: { league: league.id, season } })
    setTopAssistList(res.data.response)
  }
  const getTopYellowCard = async () => {
    const res = await axios.get('/players/topyellowcards', {
      params: { league: league.id, season },
    })
    setTopYellowCardList(res.data.response)
  }
  const getTopRedCard = async () => {
    const res = await axios.get('/players/topredcards', {
      params: { league: league.id, season },
    })
    setTopRedCardList(res.data.response)
  }

  useEffect(() => {
    getTopScorer()
    getTopAssist()
    getTopYellowCard()
    getTopRedCard()
  }, [season])

  useEffect(() => {
    const temp = []
    if (topScorerSelected) temp.push({ type: 'Top Scorer', data: topScorerList })
    if (topAssistSelected) temp.push({ type: 'Top Assists', data: topAssistList })
    if (topYellowCardSelected) temp.push({ type: 'Top Yellow Cards', data: topYellowCardList })
    if (topRedCardSelected) temp.push({ type: 'Top Red Cards', data: topRedCardList })
    setData(temp)
  }, [
    topScorerSelected,
    topAssistSelected,
    topYellowCardSelected,
    topRedCardSelected,
    topScorerList,
    topAssistList,
    topYellowCardList,
    topRedCardList,
  ])

  return (
    <React.Fragment>
      <Container>
        <SelectBox
          selectMode={selectMode}
          selected={topScorerSelected}
          onClick={() => setTopScorerSelected(!topScorerSelected)}
        />
        <Index>Top Scorer</Index>
        {topScorerList.slice(0, topScorerOpen ? 10 : 3).map((p, i) => {
          return (
            <PlayerInfoBox
              key={i}
              playerData={p}
              stat={p.statistics[0].goals.total}
              size={i === 0 ? 'medium' : 'small'}
            />
          )
        })}
        <ViewMore onClick={() => setTopScorerOpen(!topScorerOpen)}>
          {topScorerOpen ? 'View Less' : 'View More'}
        </ViewMore>
      </Container>
      <Container>
        <SelectBox
          selectMode={selectMode}
          selected={topAssistSelected}
          onClick={() => setTopAssistSelected(!topAssistSelected)}
        />
        <Index>Top Assists</Index>
        {topAssistList.slice(0, topAssistOpen ? 10 : 3).map((p, i) => {
          return (
            <PlayerInfoBox
              key={i}
              playerData={p}
              stat={p.statistics[0].goals.assists}
              size={i === 0 ? 'medium' : 'small'}
            />
          )
        })}
        <ViewMore onClick={() => setTopAssistOpen(!topAssistOpen)}>
          {topAssistOpen ? 'View Less' : 'View More'}
        </ViewMore>
      </Container>
      <Container>
        <SelectBox
          selectMode={selectMode}
          selected={topYellowCardSelected}
          onClick={() => setTopYellowCardSelected(!topYellowCardSelected)}
        />
        <Index>Top Yellow Cards</Index>
        {topYellowCardList.slice(0, topYellowCardOpen ? 10 : 3).map((p, i) => {
          return (
            <PlayerInfoBox
              key={i}
              playerData={p}
              stat={p.statistics[0].cards.yellow}
              size={i === 0 ? 'medium' : 'small'}
            />
          )
        })}
        <ViewMore onClick={() => setTopYellowCardOpen(!topYellowCardOpen)}>
          {topYellowCardOpen ? 'View Less' : 'View More'}
        </ViewMore>
      </Container>
      <Container>
        <SelectBox
          selectMode={selectMode}
          selected={topRedCardSelected}
          onClick={() => setTopRedCardSelected(!topRedCardSelected)}
        />
        <Index>Top Red Cards</Index>
        {topRedCardList.slice(0, topRedCardOpen ? 10 : 3).map((p, i) => {
          return (
            <PlayerInfoBox
              key={i}
              playerData={p}
              stat={p.statistics[0].cards.red}
              size={i === 0 ? 'medium' : 'small'}
            />
          )
        })}
        <ViewMore onClick={() => setTopRedCardOpen(!topRedCardOpen)}>
          {topYellowCardOpen ? 'View Less' : 'View More'}
        </ViewMore>
      </Container>
    </React.Fragment>
  )
}

export default LeagueStats
