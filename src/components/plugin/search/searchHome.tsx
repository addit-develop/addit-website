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
  searchKey: string
}

const SearchHome = ({ searchKey }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [playerList, setPlayerList] = useState<PlayerDataType[]>([])

  const searchPlayer = async () => {
    const response = await axios.get('/players', { params: { league: 39, search: searchKey } })
    console.log(response.data)
    if (response) {
      setIsLoading(false)
    }
    setPlayerList(response.data.response)
  }

  useEffect(() => {
    console.log(searchKey)
    searchPlayer()
  }, [])

  if (isLoading) return null
  return (
    <React.Fragment>
      <Container>
        {playerList.length === 0 ? (
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

export default SearchHome
