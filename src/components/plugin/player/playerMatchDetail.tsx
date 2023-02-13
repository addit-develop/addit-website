import { COLORS } from '@/constants/constants'
import {
  PlayerMatchStatsType,
  FixtureType,
  TeamType,
  PlayerDataType,
  PlayerType,
  MatchDetailDataType,
  FixtureStatsType,
} from '@/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import PlayerInfoBox from '../common/playerInfoBox'
import FixtureTable from '../common/fixtureTable'
import PlayerMatchStats from './playerMatchStats'
import useAxios from '@/hooks/useAxios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/reducers'
import SelectBox, { ElementContainer } from '../common/selectBox'
import { setBlockData } from '@/store/actions/postAction'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'

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
  blockId: string
}

const PlayerMatchDetail = ({ matchStatData, playerData, fixtureData, blockId }: PropsType) => {
  const axios = useAxios()
  const [statData, setStatData] = useState<PlayerMatchStatsType | undefined>(matchStatData)

  const dispatch = useDispatch()
  const { selectMode } = useSelector((state: RootState) => state.pageReducer)
  const [playerMatchBlockData, setPlayerMatchBlockData] = useState<{
    stats: boolean
    playerData: PlayerDataType
    fixtureData: MatchDetailDataType | FixtureType
    statsData: FixtureStatsType | undefined
  }>({
    stats: false,
    playerData: playerData,
    fixtureData: fixtureData,
    statsData: statData?.statistics[0],
  })

  const getStatData = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/fixtures/players', {
      params: {
        fixture: fixtureData?.fixture.id,
      },
    })
    res.data.response.forEach((team: any) => {
      const temp = team.players.find((player: any) => player.player.id === playerData.player.id)
      if (temp) {
        setStatData(temp)
        setPlayerMatchBlockData({ ...playerMatchBlockData, statsData: temp.statistics[0] })
      }
    })
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    if (!matchStatData) {
      getStatData()
    }
  }, [])

  useEffect(() => {
    if (playerMatchBlockData) dispatch(setBlockData(blockId, playerMatchBlockData))
  }, [playerMatchBlockData])

  const selectStats = useCallback(() => {
    setPlayerMatchBlockData({ ...playerMatchBlockData, stats: !playerMatchBlockData.stats })
  }, [playerMatchBlockData])

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
        <ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={playerMatchBlockData.stats}
            onClick={selectStats}
          />
          <PlayerMatchStats data={statData?.statistics[0]} />
        </ElementContainer>
      </Container>
    </React.Fragment>
  )
}

export default PlayerMatchDetail
