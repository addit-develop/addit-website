import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { PlayerDataType, PlayerType, SeasonType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BoldTitleBox from '../common/boldTitleBox'
import CircledImage from '../common/circledImage'
import SeasonDropDown from '../common/seasonDropDown'
import PlayerTeamStats from './playerTeamStats'

const Container = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 10px;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const ViewLabel = styled.div`
  font-size: 14px;
  color: ${COLORS.darkgray};
  display: flex;
  padding: 10px 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

interface PropsType {
  data: PlayerDataType
  season: number
  setSeason?: ((season: number) => void) | undefined
}

const PlayerCareerStats = ({ data, setSeason, season }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const { currentSeason } = useCurrentSeason()
  const [playerData, setPlayerData] = useState<PlayerDataType>(data)
  const [seasonList, setSeasonList] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const getPlayerSeason = async () => {
    const res = await axios.get('/players/seasons', { params: { player: playerData.player.id } })
    setSeasonList(res.data.response)
  }

  const getPlayerDetail = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/players', {
      params: { id: playerData.player.id, season: season },
    })
    setPlayerData(res.data.response[0])
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getPlayerSeason()
  }, [])

  useEffect(() => {
    if (season === currentSeason) setPlayerData(data)
    else getPlayerDetail()
  }, [season])

  if (!data) return null
  return (
    <React.Fragment>
      <Container>
        <BoldTitleBox>
          Career Stats
          <SeasonDropDown
            season={season}
            setSeason={setSeason}
            seasonList={seasonList.slice().reverse()}
            shorten={true}
          />
        </BoldTitleBox>
        <Column>
          {playerData.statistics.slice(0, isOpen ? undefined : 1).map((s, i) => {
            return <PlayerTeamStats statistics={s} key={i} player={playerData.player} />
          })}
        </Column>
        <ViewLabel onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'View Less' : 'View All'}
        </ViewLabel>
      </Container>
    </React.Fragment>
  )
}

export default PlayerCareerStats
