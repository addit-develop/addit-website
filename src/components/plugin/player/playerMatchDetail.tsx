import { COLORS } from '@/constants/constants'
import {
  PlayerMatchStatsType,
  FixtureType,
  TeamType,
  PlayerDataType,
  PlayerType,
  MatchDetailDataType,
} from '@/types'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import PlayerInfoBox from '../common/playerInfoBox'
import FixtureTable from '../common/fixtureTable'
import PlayerMatchStats from './playerMatchStats'
import useAxios from '@/hooks/useAxios'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.lightgray};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 2px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const MatchContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.white};
`

const Round = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  color: ${COLORS.darkgray};
`

interface PropsType {
  matchStatData?: PlayerMatchStatsType
  playerData: PlayerDataType
  fixtureData: MatchDetailDataType | FixtureType
  selectMode: boolean
  blockId: string
}

const PlayerMatchDetail = ({
  matchStatData,
  playerData,
  fixtureData,
  selectMode,
  blockId,
}: PropsType) => {
  const axios = useAxios()
  const [statData, setStatData] = useState<PlayerMatchStatsType | undefined>(matchStatData)

  const getStatData = async () => {
    console.log('===getStatData===')
    const res = await axios.get('/fixtures/players', {
      params: {
        fixture: fixtureData?.fixture.id,
      },
    })
    // console.log(res.data)
    res.data.response.forEach((team: any) => {
      const temp = team.players.find((player: any) => player.player.id === playerData.player.id)
      if (temp) setStatData(temp)
    })
  }

  useEffect(() => {
    if (!matchStatData) {
      getStatData()
    }
  }, [])

  if (!statData) return null
  return (
    <React.Fragment>
      <Container>
        <PlayerInfoBox playerData={playerData} size="large" />
        <MatchContainer>
          <Round>
            {fixtureData.league?.name} {fixtureData.league?.round}
          </Round>
          <FixtureTable fixture={fixtureData} />
        </MatchContainer>
        <PlayerMatchStats data={statData?.statistics[0]} />
      </Container>
    </React.Fragment>
  )
}

export default PlayerMatchDetail
