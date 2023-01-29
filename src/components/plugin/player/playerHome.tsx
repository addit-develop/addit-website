import React, { useEffect, useState } from 'react'
import { PlayerDataType, PlayerType, StatisticsType } from '@/types'
import useAxios from '@/hooks/useAxios'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { useDispatch } from 'react-redux'
import PlayerInfoBox from '../common/playerInfoBox'
import { changeModalPage } from '@/store/actions/pageAction'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2px;
  background-color: ${COLORS.lightgray};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const SearchAny = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PlayerHome = () => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const [playerList, setPlayerList] = useState<PlayerDataType[]>([])

  const searchPlayer = async (key: string) => {
    const response = await axios.get('/players', { params: { league: 39, search: key } })
    setPlayerList(response.data.response)
    console.log(response)
  }

  useEffect(() => {
    searchPlayer('son heung')
  }, [])

  return (
    <React.Fragment>
      <Container>
        {playerList.length === 0 ? (
          <SearchAny>Search any player</SearchAny>
        ) : (
          <>
            {playerList.map((p) => {
              return (
                <div
                  key={p.player.id}
                  onClick={() => dispatch(changeModalPage('playerDetail', 'Players', p.player.id))}
                >
                  <PlayerInfoBox player={p.player} />
                </div>
              )
            })}
          </>
        )}
      </Container>
    </React.Fragment>
  )
}

export default PlayerHome
