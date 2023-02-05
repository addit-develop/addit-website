import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import {
  FixtureType,
  PlayerDataType,
  PlayerMatchStatsType,
  PlayerShortType,
  TeamType,
} from '@/types'
import dayjs from 'dayjs'
import { current } from 'immer'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import FixtureTable from '../common/fixtureTable'

const Container = styled.div`
  height: 300px;
`

interface PropsType {
  playerData: PlayerDataType
  playerTeam: { team: TeamType; players: PlayerShortType[] }[]
}

const PlayerRecentMatches = ({ playerData, playerTeam }: PropsType) => {
  const axios = useAxios()
  const dispatch = useDispatch()
  const today = useMemo(() => dayjs(), [])
  const { currentSeason } = useCurrentSeason()

  const [recentMatches, setRecentMatches] = useState<FixtureType[]>([])

  const getRecentFixtures = () => {
    console.log('getRecentFixtures')
    dispatch(loadDataStart())
    playerTeam.forEach(async (team) => {
      const res = await axios.get('/fixtures', {
        params: {
          team: team.team.id,
          season: currentSeason,
          from: today.subtract(1, 'week').format('YYYY-MM-DD'),
          to: today.format('YYYY-MM-DD'),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      })
      console.log(res.data.response)
      setRecentMatches(recentMatches.concat(res.data.response))
    })
    console.log(recentMatches)
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getRecentFixtures()
  }, [])

  return (
    <React.Fragment>
      <Container>
        {/* <FixtureTable fixture={recentMatches[0]} /> */}
        {/* {recentMatches.map((f) => {
          return <FixtureTable key={f.fixture.id} fixture={f} />
        })} */}
      </Container>
    </React.Fragment>
  )
}

export default PlayerRecentMatches
