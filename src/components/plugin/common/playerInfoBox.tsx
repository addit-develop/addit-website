import { COLORS } from '@/constants/constants'
import { useCountryFlag } from '@/hooks/useCountryFlag'
import { changeModalPage } from '@/store/actions/pageAction'
import { RootState } from '@/store/reducers'
import { PlayerDataType, PlayerDataShortedType } from '@/types'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CircledImage from './circledImage'

const Container = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: fit-content;
  padding: 8px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: ${COLORS.white};
  cursor: pointer;
`

const PlayerImage = styled.img<{ size: string }>`
  width: ${(props) => (props.size === 'large' ? '72px' : '54px')};
  height: ${(props) =>
    props.size === 'large' ? '72px' : props.size === 'medium' ? '54px' : '40px'};
  object-fit: contain;
`

const PlayerInfo = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  gap: 8px;
`

const PlayerName = styled.div<{ size: string }>`
  width: 100%;
  font-size: ${(props) =>
    props.size === 'large' ? '20px' : props.size === 'medium' ? '18px' : '16px'};
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
  playerData: PlayerDataType | PlayerDataShortedType
  stat?: number
  size: string
}

const PlayerInfoBox = ({ playerData, stat, size = 'large' }: PropsType) => {
  const dispatch = useDispatch()
  const player = playerData.player
  const club = playerData.statistics[0].team || null
  const countryFlag = useCountryFlag(player.nationality)
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          dispatch(changeModalPage('playerDetail', 'Players', player.id))
        }}
      >
        <PlayerImage src={player.photo} alt={player.name} size={size} />
        <PlayerInfo>
          <PlayerName size={size}>{player.name}</PlayerName>
          <PlayerTeamRow>
            {player.nationality && (
              <PlayerTeam>
                {size === 'small' ? (
                  <CircledImage
                    src={countryFlag}
                    width={16}
                    height={16}
                    altText={player.nationality}
                  />
                ) : (
                  <CircledImage
                    src={countryFlag}
                    width={24}
                    height={24}
                    altText={player.nationality}
                  />
                )}
                <div>{player.nationality}</div>
              </PlayerTeam>
            )}
            {club && (
              <PlayerTeam>
                {size === 'small' ? (
                  <CircledImage src={club.logo} width={16} height={16} altText={club.name} />
                ) : (
                  <CircledImage src={club.logo} width={24} height={24} altText={club.name} />
                )}
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
