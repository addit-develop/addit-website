import { PlayerType } from '@/types'
import * as Styles from './style'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PlayerHome = () => {
  const [playerList, setPlayerList] = useState<{ player: PlayerType; statistics: any }[]>([])
  const headers = {
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RapidAPI_Host,
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RapidAPI_Key,
  }
  useEffect(() => {
    axios
      .request({
        method: 'GET',
        url: process.env.NEXT_PUBLIC_BASE_URL + '/players',
        params: { league: 39, season: 2019 },
        headers,
      })
      .then((response) => {
        console.log(response)
        setPlayerList(response.data.response)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [playerList])

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
