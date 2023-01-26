import useAxios from '@/hooks/useAxios'
import { PlayerDataType, PlayerType } from '@/types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlayerInfoBox from './playerInfoBox'
import PlayerStatBox from './playerStatBox'

const Container = styled.div`
  width: 100%;
`

interface PropsType {
  playerId: number
  blockId: string
}

const PlayerDetail = ({ playerId, blockId }: PropsType) => {
  const axios = useAxios()
  const [playerDetailData, setPlayerDetailData] = useState<PlayerDataType | null>(null)
  const getPlayerDetail = async () => {
    const res = await axios.get('/players', { params: { id: playerId, season: 2022 } })
    console.log(res)
    setPlayerDetailData(res.data.response[0])
  }

  useEffect(() => {
    getPlayerDetail()
  }, [])

  if (!playerDetailData) return null
  return (
    <React.Fragment>
      <Container>
        <PlayerInfoBox
          player={playerDetailData.player}
          club={playerDetailData.statistics[0].team}
        />
        <PlayerStatBox playerData={playerDetailData} />
      </Container>
    </React.Fragment>
  )
}

export default PlayerDetail
