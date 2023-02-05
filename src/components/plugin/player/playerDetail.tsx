import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { PlayerDataType, PlayerShortType, PlayerType, TeamType } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import PlayerInfoBox from '../common/playerInfoBox'
import PlayerCareerStats from './playerCareerStats'
import PlayerRecentMatches from './playerRecentMatches'
import PlayerStatBox from './playerStatBox'
import SelectBox, { ElementContainer } from '../common/selectBox'
import { RootState } from '@/store/reducers'
import { setBlockData } from '@/store/actions/postAction'

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
  const [playerData, setPlayerData] = useState<PlayerDataType | undefined>()
  const [playerTeam, setPlayerTeam] = useState<{ team: TeamType; players: PlayerShortType[] }[]>([])

  const { selectMode } = useSelector((state: RootState) => state.pageReducer)
  const [playerBlockData, setPlayerBlockData] = useState<{
    statBox: boolean
    recentMatches: boolean
    careerStats: boolean
    playerData: PlayerDataType | undefined
    playerTeam: { team: TeamType; players: PlayerShortType[] }[]
    season: number
  }>({
    statBox: false,
    recentMatches: false,
    careerStats: false,
    playerData: playerData,
    playerTeam: playerTeam,
    season,
  })

  const changeSeason = useCallback(
    (x: number) => {
      setSeason(x)
      setPlayerBlockData({
        ...playerBlockData,
        season: x,
      })
    },
    [playerBlockData]
  )

  useEffect(() => {
    if (playerBlockData) dispatch(setBlockData(blockId, playerBlockData))
  }, [playerBlockData])

  const getPlayerDetail = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/players', { params: { id: playerId, season: season } })
    setPlayerData(res.data.response[0])
    setPlayerBlockData({
      ...playerBlockData,
      playerData: res.data.response[0],
    })
    dispatch(loadDataFinish())
  }

  const getPlayerTeam = async () => {
    const res = await axios.get('/players/squads', { params: { player: playerId } })
    setPlayerTeam(res.data.response)
    setPlayerBlockData({
      ...playerBlockData,
      playerTeam: res.data.response[0],
    })
  }

  useEffect(() => {
    getPlayerDetail()
    getPlayerTeam()
  }, [playerId])

  const selectElement = (type: string) => {
    switch (type) {
      case 'statBox':
        setPlayerBlockData({ ...playerBlockData, statBox: !playerBlockData.statBox })
        break
      case 'recentMatches':
        setPlayerBlockData({ ...playerBlockData, recentMatches: !playerBlockData.recentMatches })
        break
      case 'careerStats':
        setPlayerBlockData({ ...playerBlockData, careerStats: !playerBlockData.careerStats })
        break
    }
  }

  if (!playerData) return null
  return (
    <React.Fragment>
      <Container>
        <PlayerInfoBox playerData={playerData} />
        <ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={playerBlockData.statBox}
            onClick={() => selectElement('statBox')}
          />
          <PlayerStatBox playerData={playerData} playerTeam={playerTeam} />
        </ElementContainer>
        <ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={playerBlockData.recentMatches}
            onClick={() => selectElement('recentMatches')}
          />
          <PlayerRecentMatches playerData={playerData} />
        </ElementContainer>
        <ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={playerBlockData.careerStats}
            onClick={() => selectElement('careerStats')}
          />
          <PlayerCareerStats player={playerData.player} setSeason={changeSeason} season={season} />
        </ElementContainer>
      </Container>
    </React.Fragment>
  )
}

export default PlayerDetail
