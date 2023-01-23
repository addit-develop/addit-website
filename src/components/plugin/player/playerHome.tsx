import { playerDataType, playerType, statisticsType } from '@/types'
import * as Styles from './style'
import React, { useEffect, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import Link from 'next/link'

const PlayerHome = () => {
  const [playerList, setPlayerList] = useState<playerDataType[]>([])

  const axios = useAxios()
  const getPlayersData = async () => {
    const response = await axios.get('/players', { params: { league: 39, season: 2019 } })
    setPlayerList(response.data.response)
  }

  useEffect(() => {
    getPlayersData()
  }, [])

  return (
    <React.Fragment>
      <Styles.Container>
        <div>{playerList.length}</div>
        {playerList.map((data, i) => {
          return <div key={i}>{data.player.name}</div>
        })}
      </Styles.Container>
    </React.Fragment>
  )
}

export default PlayerHome
