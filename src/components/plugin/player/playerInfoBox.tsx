import { COLORS } from '@/constants/constants'
import { useCountryFlag } from '@/hooks/useCountryFlag'
import { PlayerDataType, PlayerType, TeamType } from '@/types'
import Image from 'next/image'
import React from 'react'
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
interface PropsType {
  player: PlayerType
  club: TeamType
}
const PlayerInfoBox = ({ player, club }: PropsType) => {
  const countryFlag = useCountryFlag(player.nationality)
  return (
    <React.Fragment>
      <Container>
        <Image src={player.photo} width={72} height={72} alt={player.name} />
        <PlayerInfo>
          <PlayerName>
            {player.firstname} {player.lastname}
          </PlayerName>
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
          </PlayerTeamRow>
        </PlayerInfo>
      </Container>
    </React.Fragment>
  )
}

export default PlayerInfoBox