import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { PlayerDataType, PlayerShortType, PlayerType, TeamType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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
  const dispatch = useDispatch()
  const axios = useAxios()
  const { currentSeason } = useCurrentSeason()
  const [season, setSeason] = useState<number>(currentSeason)
  const [playerData, setPlayerData] = useState<PlayerDataType | null>(null)
  const [playerTeam, setPlayerTeam] = useState<{ team: TeamType; players: PlayerShortType[] }[]>([])

  const getPlayerDetail = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/players', { params: { id: playerId, season: season } })
    setPlayerData(res.data.response[0])
    dispatch(loadDataFinish())
  }

  const getPlayerTeam = async () => {
    const res = await axios.get('/players/squads', { params: { player: playerId } })
    setPlayerTeam(res.data.response)
  }

  useEffect(() => {
    getPlayerDetail()
    getPlayerTeam()
  }, [playerId])

  if (!playerData) return null
  return (
    <React.Fragment>
      <Container>
        <PlayerInfoBox playerData={playerData} />
        <PlayerStatBox playerData={playerData} playerTeam={playerTeam} />
        <PlayerRecentMatches playerData={playerData} playerTeam={playerTeam} />
        <PlayerCareerStats player={playerData.player} setSeason={setSeason} season={season} />
      </Container>
    </React.Fragment>
  )
}

export default PlayerDetail
