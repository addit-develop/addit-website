import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { PlayerDataType, PlayerType } from '@/types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlayerInfoBox from '../common/playerInfoBox'
import PlayerCareerStats from './playerCareerStats'
import PlayerRecentMatches from './playerRecentMatches'
import PlayerStatBox from './playerStatBox'

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

interface PropsType {
  playerId: number
  blockId: string
}

const PlayerDetail = ({ playerId, blockId }: PropsType) => {
  const axios = useAxios()
  const { currentSeason } = useCurrentSeason()
  const [playerDetailData, setPlayerDetailData] = useState<PlayerDataType | null>(null)
  const [playerNumber, setPlayerNumber] = useState<number | null>(null)
  const getPlayerDetail = async () => {
    const res = await axios.get('/players', { params: { id: playerId, season: currentSeason } })
    setPlayerDetailData(res.data.response[0])
  }

  const getPlayerNumber = async () => {
    const res = await axios.get('/players/squads', { params: { player: playerId } })
    console.log(res.data.response)
    setPlayerNumber(res.data.response[1].players[0].number)
  }

  useEffect(() => {
    getPlayerDetail()
    getPlayerNumber()
  }, [])

  if (!playerDetailData) return null
  return (
    <React.Fragment>
      <Container>
        <PlayerInfoBox
          player={playerDetailData.player}
          club={playerDetailData.statistics[0].team}
        />
        <PlayerStatBox playerData={playerDetailData} playerNumber={playerNumber || 0} />
        <PlayerCareerStats />
        <PlayerRecentMatches />
      </Container>
    </React.Fragment>
  )
}

export default PlayerDetail
