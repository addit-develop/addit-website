import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { PlayerType, TeamType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BoldTitleBox from '../common/boldTitleBox'
import PlayerInfoBox from '../common/playerInfoBox'

const Position = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 10px;
`

interface PropsType {
  team: TeamType
}

const TeamSquad = ({ team }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const [squadData, setSquadData] = useState<PlayerType[]>([])
  const [coachData, setCoachData] = useState<PlayerType[]>([])
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

  const getCoachData = async () => {
    const res = await axios.get('/coachs', {
      params: {
        team: team.id,
      },
    })
    if (res.data.response.length) {
      setCoachData(res.data.response)
    }
  }

  useEffect(() => {
    dispatch(loadDataStart())
    getSquadData()
    getCoachData().then(() => dispatch(loadDataFinish()))
  }, [team])

  return (
    <React.Fragment>
      <Position>
        <BoldTitleBox>Coach</BoldTitleBox>
        {coachData.length > 0 &&
          coachData.map((c) => {
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
              />
            )
          })}
      </Position>
      {positionList.map((p) => {
        return (
          <Position key={p}>
            <BoldTitleBox>{p}s</BoldTitleBox>
            {squadData
              .filter((player) => player.position === p)
              .map((player) => {
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
                  />
                )
              })}
          </Position>
        )
      })}
    </React.Fragment>
  )
}

export default TeamSquad
