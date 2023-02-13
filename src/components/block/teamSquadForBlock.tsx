import { COLORS } from '@/constants/constants'
import { PlayerType, TeamType } from '@/types'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import BoldTitleBox from '../plugin/common/boldTitleBox'
import PlayerInfoBox from '../plugin/common/playerInfoBox'

const Position = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 10px;
`

interface PropsType {
  data: {
    [index: string]: any
    coach: PlayerType[] | null
    Goalkeeper: PlayerTypeWithPosition[]
    Defender: PlayerTypeWithPosition[]
    Midfielder: PlayerTypeWithPosition[]
    Attacker: PlayerTypeWithPosition[]
  }
  team: TeamType
}

interface PlayerTypeWithPosition extends PlayerType {
  position: string
}

const TeamSquad = ({ data, team }: PropsType) => {
  const getPositionElement = useCallback((position: string, players: PlayerType[]) => {
    return (
      <Position>
        <BoldTitleBox>{position}s</BoldTitleBox>
        {players.map((player) => {
          return (
            <PlayerInfoBox
              key={player.id}
              playerData={{
                player: {
                  id: player.id,
                  name: player.name,
                  photo: player.photo,
                  nationality: player.nationality,
                },
                statistics: [
                  {
                    team: {
                      id: team.id,
                      logo: team.logo,
                      name: team.name,
                    },
                  },
                ],
              }}
              size="small"
            />
          )
        })}
      </Position>
    )
  }, [])

  return (
    <React.Fragment>
      <Position>
        <BoldTitleBox>Coach</BoldTitleBox>
        {data.coach?.length &&
          data.coach.map((c) => {
            return (
              <PlayerInfoBox
                key={c.id}
                playerData={{
                  player: {
                    id: c.id,
                    name: c.name,
                    photo: c.photo,
                    nationality: c.nationality,
                  },
                  statistics: [
                    {
                      team: {
                        id: team.id,
                        logo: team.logo,
                        name: team.name,
                      },
                    },
                  ],
                }}
                size="small"
                disabled
              />
            )
          })}
      </Position>
      {data.Goalkeeper.length && getPositionElement('Goalkeeper', data.Goalkeeper)}
      {data.Defender.length && getPositionElement('Defender', data.Defender)}
      {data.Midfielder.length && getPositionElement('Midfielder', data.Midfielder)}
      {data.Attacker.length && getPositionElement('Attacker', data.Attacker)}
    </React.Fragment>
  )
}

export default TeamSquad
