import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { PlayerDataType, PlayerType, TeamType } from '@/types'
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
  const [season, setSeason] = useState<number>(currentSeason)
  const [playerData, setPlayerData] = useState<PlayerDataType | null>(null)

  const getPlayerDetail = async () => {
    const res = await axios.get('/players', { params: { id: playerId, season: season } })
    setPlayerData(res.data.response[0])
  }

  useEffect(() => {
    getPlayerDetail()
  }, [])

  if (!playerData) return null
  return (
    <React.Fragment>
      <Container>
        <PlayerInfoBox playerData={playerData} />
        <PlayerStatBox playerData={playerData} />
        <PlayerRecentMatches />
        <PlayerCareerStats playerData={playerData} />
      </Container>
    </React.Fragment>
  )
}

export default PlayerDetail
