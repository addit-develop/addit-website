import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { useDispatch } from 'react-redux'
import useAxios from '@/hooks/useAxios'
import { PlayerDataType } from '@/types'
import { changeModalPage, loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import PlayerInfoBox from '../common/playerInfoBox'
export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2px;
  background-color: ${COLORS.white};
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
interface PropsType {
  leagueId?: number
  searchKey?: string
}

const PlayerHome = ({ leagueId, searchKey }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [playerList, setPlayerList] = useState<PlayerDataType[]>([])

  const searchPlayer = async () => {
    setIsLoading(true)
    dispatch(loadDataStart())
    const response = await axios.get('/players', {
      params: { league: leagueId, search: searchKey },
    })
    console.log(response.data)
    if (response) {
      setPlayerList(response.data.response)
      dispatch(loadDataFinish())
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (leagueId && searchKey) {
      searchPlayer()
    }
  }, [leagueId, searchKey])

  if (isLoading) return null
  return (
    <React.Fragment>
      <Container>
        {!searchKey || !leagueId ? (
          <SearchAny>Search player</SearchAny>
        ) : searchKey.length < 4 ? (
          <SearchAny>Search keyword must be at least 4 characters.</SearchAny>
        ) : playerList.length === 0 ? (
          <SearchAny>{`Cannot find player with name '${searchKey}'.`}</SearchAny>
        ) : (
          <>
            {playerList.map((p) => {
              return (
                <div
                  key={p.player.id}
                  onClick={() => dispatch(changeModalPage('playerDetail', 'Players', p.player.id))}
                >
                  <PlayerInfoBox playerData={p} />
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
