import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import {
  FixtureType,
  PlayerDataType,
  StandingDataType,
  TeamBlockDataType,
  TeamStatisticType,
  TeamType,
} from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import MenuBar from '../common/menuBar'
import TeamDetailTitle from './teamDetailTitle'
import TeamFixtures from './teamFixtures'
import TeamSquad from './teamSquad'
import TeamStats from './teamStats'
import TeamTable from './teamTable'
import TeamTransfer from './teamTransfer'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

interface PropsType {
  teamId: number
  leagueId: number
  blockId: string
}

type specificDataType =
  | { standingData: StandingDataType[]; selectedTeamId: number | undefined }
  | FixtureType[][]
  | { type: string; data: PlayerDataType[] }[]

const TeamDetail = ({ teamId, leagueId, blockId }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const menu = ['Fixtures', 'Table', 'Squad', 'Stats', 'Transfer']
  const { currentSeason } = useCurrentSeason()
  const [team, setTeam] = useState<TeamStatisticType>()
  const [selectedMenu, setSelectedMenu] = useState<string>('Fixtures')

  //팀 블록 데이터
  const [teamBlockData, setTeamBlockData] = useState<TeamBlockDataType>({
    tab: selectedMenu,
    teamData: undefined,
  })
  //팀 블록 데이터 저장 함수. 하위 element에 props로 전달
  const setDataInTeamBlockData = useCallback(
    (data: specificDataType) => {
      const newData = {
        tab: selectedMenu,
        teamData: team
          ? {
              team: team,
              data: data,
            }
          : undefined,
      }
      setTeamBlockData(newData)
    },
    [teamBlockData, team, selectedMenu]
  )

  const getTeamData = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/teams/statistics', {
      params: { team: teamId, league: leagueId, season: currentSeason },
    })
    setTeam(res.data.response)
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getTeamData()
  }, [teamId, leagueId])

  if (!team) return null
  return (
    <React.Fragment>
      <Container>
        <TeamDetailTitle team={team.team} league={team.league} />
        <MenuBar menu={menu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <Content>
          {selectedMenu === 'Fixtures' ? (
            <TeamFixtures
              team={team}
              setData={(data: specificDataType) => setDataInTeamBlockData(data)}
            />
          ) : selectedMenu === 'Table' ? (
            <TeamTable
              team={team}
              season={currentSeason}
              setData={(data: specificDataType) => setDataInTeamBlockData(data)}
            />
          ) : selectedMenu === 'Squad' ? (
            <TeamSquad
              team={team.team}
              setData={(data: specificDataType) => setDataInTeamBlockData(data)}
            />
          ) : selectedMenu === 'Stats' ? (
            <TeamStats
              team={team}
              setData={(data: specificDataType) => setDataInTeamBlockData(data)}
            />
          ) : (
            <TeamTransfer
              team={team}
              setData={(data: specificDataType) => setDataInTeamBlockData(data)}
            />
          )}
        </Content>
      </Container>
    </React.Fragment>
  )
}
export default TeamDetail
