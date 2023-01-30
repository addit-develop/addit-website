import { COLORS } from '@/constants/constants'
import { useCountryFlag } from '@/hooks/useCountryFlag'
import { changeModalPage } from '@/store/actions/pageAction'
import { RootState } from '@/store/reducers'
import { PlayerDataType, PlayerType, TeamType } from '@/types'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: ${COLORS.white};
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 1px;
`
const PlayerInfo = styled.div`
  flex: 1;

  flex-direction: column;
  display: flex;
  gap: 8px;
`
const PlayerName = styled.div`
  width: 300px;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const PlayerTeamRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

const PlayerTeam = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: 14px;
`
const Stat = styled.div`
  font-size: 18px;
  color: ${COLORS.blue};
`
interface PropsType {
  player: PlayerType
  club?: TeamType
  stat?: number
}

const PlayerInfoBox = ({ player, club, stat }: PropsType) => {
  const dispatch = useDispatch()
  const {} = useSelector((state: RootState) => state.pageReducer)
  const countryFlag = useCountryFlag(player.nationality)
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          dispatch(changeModalPage('playerDetail', 'Players', player.id))
        }}
      >
        <Image src={player.photo} width={72} height={72} alt={player.name} />
        <PlayerInfo>
          <PlayerName>{player.name}</PlayerName>
          <PlayerTeamRow>
            <PlayerTeam>
              <Image
                src={countryFlag}
                width={24}
                height={24}
                alt={player.name}
                style={{ borderRadius: 12, borderWidth: 1, borderColor: COLORS.lightgray }}
              />
              <div>{player.nationality}</div>
            </PlayerTeam>
            {club && (
              <PlayerTeam>
                <Image
                  src={club.logo}
                  width={24}
                  height={24}
                  alt={player.name}
                  style={{ borderRadius: 12, borderWidth: 1, borderColor: COLORS.lightgray }}
                />
                <div>{club.name}</div>
              </PlayerTeam>
            )}
          </PlayerTeamRow>
        </PlayerInfo>
        {stat && <Stat>{stat}</Stat>}
      </Container>
    </React.Fragment>
  )
}

export default PlayerInfoBox
