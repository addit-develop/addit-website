import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
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

interface PropsType {
  player: PlayerType
  season: number
  setSeason?: (season: number) => void
}

const PlayerCareerStats = ({ player, setSeason, season }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const [playerData, setPlayerData] = useState<PlayerDataType | null>(null)
  const [seasonList, setSeasonList] = useState<number[]>([])

  const getPlayerSeason = async () => {
    const res = await axios.get('/players/seasons', { params: { player: player.id } })
    setSeasonList(res.data.response)
  }

  const getPlayerDetail = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/players', { params: { id: player.id, season: season } })
    setPlayerData(res.data.response[0])
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getPlayerSeason()
  }, [])

  useEffect(() => {
    getPlayerDetail()
  }, [season])

  if (!playerData) return null
  return (
    <React.Fragment>
      <Container>
        <BoldTitleBox>
          Career Stats
          {setSeason ? (
            <SeasonDropDown season={season} setSeason={setSeason} seasonList={seasonList} />
          ) : null}
        </BoldTitleBox>
        <Column>
          {playerData.statistics.map((s, i) => {
            return <PlayerTeamStats statistics={s} key={i} player={player} />
          })}
        </Column>
      </Container>
    </React.Fragment>
  )
}

export default PlayerCareerStats
