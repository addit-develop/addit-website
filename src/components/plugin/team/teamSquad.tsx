import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { PlayerType, TeamType } from '@/types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlayerInfoBox from '../common/playerInfoBox'

const Container = styled.div``

const Position = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  margin-top: 2px;
  /* border-bottom: ${(props) => (props.forBlock ? '1px solid ${COLORS.gray}' : 'none')}; */
`

const PositionName = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: ${COLORS.black};
  cursor: pointer;
`

interface PropsType {
  team: TeamType
}

const TeamSquad = ({ team }: PropsType) => {
  const axios = useAxios()
  const [squadData, setSquadData] = useState<PlayerType[]>([])
  const [positionList, setPositionList] = useState<string[]>([])
  const getSquadData = async () => {
    const res = await axios.get('/players/squads', {
      params: {
        team: team.id,
      },
    })

    setSquadData(res.data.response[0].players)
    let temp: string[] = []
    res.data.response[0].players.forEach((s: PlayerType) => {
      if (s.position && !temp.includes(s.position)) temp.push(s.position)
    })
    setPositionList(temp)
  }

  useEffect(() => {
    getSquadData()
  }, [])

  return (
    <React.Fragment>
      <Container>
        {positionList.map((p) => {
          return (
            <Position key={p}>
              <PositionName>{p}</PositionName>
              {squadData
                .filter((player) => player.position === p)
                .map((player) => {
                  return <PlayerInfoBox key={player.id} player={player} club={team} />
                })}
            </Position>
          )
        })}
      </Container>
    </React.Fragment>
  )
}

export default TeamSquad
