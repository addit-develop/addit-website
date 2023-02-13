import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { RootState } from '@/store/reducers'
import { PlayerType, TeamType } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import BoldTitleBox from '../common/boldTitleBox'
import PlayerInfoBox from '../common/playerInfoBox'
import SelectBox, { ElementContainer } from '../common/selectBox'

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
  setData?: any
}

interface PlayerTypeWithPosition extends PlayerType {
  position: string
}

const TeamSquad = ({ team, setData }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const [squadData, setSquadData] = useState<{ data: PlayerTypeWithPosition; selected: boolean }[]>(
    []
  )
  const [coachData, setCoachData] = useState<PlayerType[]>([])
  const [positionList, setPositionList] = useState<string[]>([])

  const { selectMode } = useSelector((state: RootState) => state.pageReducer)
  const [blockData, setBlockData] = useState<{
    [index: string]: any
    coach: PlayerType[] | null
    Goalkeeper: PlayerTypeWithPosition[]
    Defender: PlayerTypeWithPosition[]
    Midfielder: PlayerTypeWithPosition[]
    Attacker: PlayerTypeWithPosition[]
  }>({
    coach: null,
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Attacker: [],
  })
  const [selectBoolean, setSelectBoolean] = useState<boolean[]>([])

  const getSquadData = async () => {
    const res = await axios.get('/players/squads', {
      params: {
        team: team.id,
      },
    })
    const dataWithBoolean = res.data.response[0].players.map((x: any) => ({
      data: x,
      selected: false,
    }))
    setSquadData(dataWithBoolean)
    setSelectBoolean(res.data.response[0].players.map((_: any) => false))
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

  // 선택 변경할 때마다 블록 데이터 반영
  useEffect(() => {
    setData(blockData)
  }, [blockData])

  const selectCoach = useCallback(() => {
    if (blockData.coach) setBlockData({ ...blockData, coach: null })
    else setBlockData({ ...blockData, coach: coachData })
  }, [blockData, coachData])

  const selectPlayer = useCallback(
    (id: number) => {
      const index = squadData.findIndex((x) => x.data.id === id)
      const squadTemp = squadData.slice()
      squadTemp[index].selected = !squadData[index].selected

      const positionTemp = squadData[index].data.position
      const dataTemp = JSON.parse(JSON.stringify(blockData))
      if (squadTemp[index].selected) dataTemp[positionTemp].push(squadData[index].data)
      else dataTemp[positionTemp].filter((x: PlayerTypeWithPosition) => x.id !== id)

      setBlockData(dataTemp)
      setSquadData(squadTemp)
    },
    [blockData, squadData]
  )

  return (
    <React.Fragment>
      <ElementContainer>
        <SelectBox
          selectMode={selectMode}
          selected={Boolean(blockData.coach)}
          onClick={selectCoach}
        />
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
                  size="small"
                  disabled
                />
              )
            })}
        </Position>
      </ElementContainer>
      {positionList.map((p) => {
        return (
          <Position key={p}>
            <BoldTitleBox>{p}s</BoldTitleBox>
            {squadData
              .filter((player) => player.data.position === p)
              .map((player) => {
                return (
                  <ElementContainer>
                    <SelectBox
                      selectMode={selectMode}
                      selected={player.selected}
                      onClick={() => selectPlayer(player.data.id)}
                    />
                    <PlayerInfoBox
                      key={player.data.id}
                      playerData={{
                        player: {
                          id: player.data.id,
                          name: player.data.name,
                          photo: player.data.photo,
                          nationality: player.data.nationality,
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
                  </ElementContainer>
                )
              })}
          </Position>
        )
      })}
    </React.Fragment>
  )
}

export default TeamSquad
