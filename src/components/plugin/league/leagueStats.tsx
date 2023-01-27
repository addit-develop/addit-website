import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { LeagueType, PlayerDataType, PlayerType, StatisticsType } from '@/types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlayerInfoBox from '../common/playerInfoBox'

const Container = styled.div`
  background-color: ${COLORS.white};
  padding: 0px 8px;
  margin-top: 2px;
`
const Index = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 12px 0px;
`
const ViewMore = styled.div`
  padding: 10px 8px;
  font-size: 14px;
  color: ${COLORS.darkgray};
  text-align: center;
`
interface PropsType {
  league: LeagueType
  season: number
}

const LeagueStats = ({ league, season }: PropsType) => {
  const axios = useAxios()

  const [topScorerList, setTopScorerList] = useState<PlayerDataType[]>([])
  const [topAssistList, setTopAssistList] = useState<PlayerDataType[]>([])
  const [topYellowCardList, setTopYellowCardList] = useState<PlayerDataType[]>([])

  const [topScorerOpen, setTopScorerOpen] = useState<boolean>(false)
  const [topAssistOpen, setTopAssistOpen] = useState<boolean>(false)
  const [topYellowCardOpen, setTopYellowCardOpen] = useState<boolean>(false)

  const getTopScorer = async () => {
    const res = await axios.get('/players/topscorers', { params: { league: league.id, season } })
    setTopScorerList(res.data.response)
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

  useEffect(() => {
    getTopScorer()
    getTopAssist()
    getTopYellowCard()
  }, [])
  return (
    <React.Fragment>
      <Container>
        <Index>Top Scorer</Index>
        {topScorerList.slice(0, topScorerOpen ? 10 : 3).map((p) => {
          return (
            <PlayerInfoBox
              player={p.player}
              club={p.statistics[0].team}
              key={p.player.name}
              stat={p.statistics[0].goals.total}
            />
          )
        })}
        <ViewMore onClick={() => setTopScorerOpen(!topScorerOpen)}>
          {topScorerOpen ? 'View Less' : 'View More'}
        </ViewMore>
      </Container>
      <Container>
        <Index>Top Assist</Index>
        {topAssistList.slice(0, topAssistOpen ? 10 : 3).map((p) => {
          return (
            <PlayerInfoBox
              player={p.player}
              club={p.statistics[0].team}
              key={p.player.name}
              stat={p.statistics[0].goals.assists}
            />
          )
        })}
        <ViewMore onClick={() => setTopAssistOpen(!topAssistOpen)}>
          {topAssistOpen ? 'View Less' : 'View More'}
        </ViewMore>
      </Container>
      <Container>
        <Index>Top Yellow Cards</Index>
        {topYellowCardList.slice(0, topYellowCardOpen ? 10 : 3).map((p) => {
          return (
            <PlayerInfoBox
              player={p.player}
              club={p.statistics[0].team}
              key={p.player.name}
              stat={p.statistics[0].cards.yellow}
            />
          )
        })}
        <ViewMore onClick={() => setTopYellowCardOpen(!topYellowCardOpen)}>
          {topYellowCardOpen ? 'View Less' : 'View More'}
        </ViewMore>
      </Container>
    </React.Fragment>
  )
}

export default LeagueStats
