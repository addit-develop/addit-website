import { default as React, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { LeagueType, TeamType } from '@/types'
import { useDispatch } from 'react-redux'
import { changeModalPage } from '@/store/actions/pageAction'
import useAxios from '@/hooks/useAxios'
import CircledImage from '../common/circledImage'

const FixturesContainer = styled.div<{ forBlock?: boolean }>`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  border-bottom: ${(props) => (props.forBlock ? '1px solid ${COLORS.gray}' : 'none')};
`

const SelectBox = styled.div<{ selectMode?: boolean; allSelected?: boolean }>`
  display: ${(props) => (props.selectMode ? 'flex' : 'none')};
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.allSelected ? 'transperant' : 'rgba(255, 255, 255, 0.8)')};
`

const LeagueTitle = styled.div`
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

const LeagueName = styled.div`
  display: flex;
  cursor: pointer;
  gap: 4px;
`

const TeamContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0px 8px 10px;
  align-items: center;
  cursor: pointer;
`

const TeamName = styled.div`
  font-size: 12px;
  margin-left: 8px;
`

interface PropsType {
  league: LeagueType
  selectMode?: boolean
  forBlock?: boolean
  blockId?: string
}

const LeaugeGroupedTeams = ({ league, selectMode, forBlock = false, blockId }: PropsType) => {
  const axios = useAxios()
  const dispatch = useDispatch()
  const [teamList, setTeamList] = useState<TeamType[]>([])
  const [listOpen, setListOpen] = useState<boolean>(false) // 개별 경기 선택 유무 리스트

  const getTeamList = async () => {
    const res = await axios.get('/teams', { params: { league: league.id, season: 2022 } })
    setTeamList(res.data.response.map((i: any) => i.team))
  }

  useEffect(() => {
    getTeamList()
  }, [])

  return (
    <React.Fragment>
      <FixturesContainer forBlock={forBlock}>
        <LeagueTitle onClick={() => setListOpen(!listOpen)}>
          <LeagueName>
            <CircledImage width={24} height={24} altText={league.name} src={league.logo} />
            {league.name}
          </LeagueName>
          {listOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z" fill={COLORS.darkgray} />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" fill={COLORS.darkgray} />
            </svg>
          )}
        </LeagueTitle>
        {listOpen &&
          teamList.map((team, i) => (
            <TeamContainer
              key={i}
              onClick={() =>
                dispatch(
                  changeModalPage('teamDetail', 'Teams', { teamId: team.id, leagueId: league.id })
                )
              }
            >
              <CircledImage src={team.logo} width={24} height={24} altText={team.name} />
              <TeamName>{team.name}</TeamName>
            </TeamContainer>
          ))}
      </FixturesContainer>
    </React.Fragment>
  )
}

export default LeaugeGroupedTeams
