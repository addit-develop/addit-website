import useAxios from '@/hooks/useAxios'
import {
  CountryType,
  FixtureType,
  LeagueBlockDataType,
  LeagueType,
  PlayerDataType,
  SeasonType,
  StandingDataType,
} from '@/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import LeagueDetailTitle from './leagueDetailTitle'

import styled from 'styled-components'
import MenuBar from '../common/menuBar'
import LeagueFixtures from './leagueFixtures'
import LeagueStanding from '../common/leagueStanding'
import LeagueStats from './leagueStats'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { setBlockData } from '@/store/actions/postAction'
import { RootState } from '@/store/reducers'

const Container = styled.div`
  overflow-y: visible;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`

interface PropsType {
  leagueId: number
  blockId: string
}

type LeagueDataType = {
  league: LeagueType
  country: CountryType
  seasons: SeasonType[]
}

type specificDataType =
  | { standingData: StandingDataType[]; selectedTeamId: number | undefined }
  | FixtureType[][]
  | { type: string; data: PlayerDataType[] }[]

const LeagueDetail = ({ leagueId, blockId }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const menu = ['Table', 'Fixtures', 'Stats']
  const today = useMemo(() => dayjs(), [])

  const [leagueData, setLeagueData] = useState<LeagueDataType>()
  const [selectedMenu, setSelectedMenu] = useState<string>('Table')
  const [season, setSeason] = useState<number>(today.year() - 1)

  //리그 블록 데이터
  const [leagueBlockData, setLeagueBlockData] = useState<LeagueBlockDataType>({
    tab: selectedMenu,
    leagueData: undefined,
  })
  //리그 블록 데이터 저장 함수. 하위 element에 props로 전달
  const setDataInLeagueBlockData = useCallback(
    (data: specificDataType) => {
      const newData = {
        tab: selectedMenu,
        leagueData: leagueData
          ? { league: leagueData.league, season: season, data: data }
          : undefined,
      }
      setLeagueBlockData(newData)
    },
    [leagueBlockData, leagueData, season, selectedMenu]
  )

  useEffect(() => {
    if (leagueBlockData) dispatch(setBlockData(blockId, leagueBlockData))
  }, [leagueBlockData])

  const getLeagueDetail = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/leagues', { params: { id: leagueId } })
    setLeagueData(res.data.response[0])
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getLeagueDetail()
  }, [season])

  if (!leagueData) return null
  return (
    <React.Fragment>
      <Container>
        <LeagueDetailTitle
          league={leagueData.league}
          season={season}
          setSeason={setSeason}
          seasonList={leagueData.seasons}
        />
        <MenuBar menu={menu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        {selectedMenu === 'Table' ? (
          <LeagueStanding
            league={leagueData.league}
            season={season}
            setData={(data: specificDataType) => setDataInLeagueBlockData(data)}
          />
        ) : selectedMenu === 'Fixtures' ? (
          <LeagueFixtures
            league={leagueData.league}
            season={season}
            setData={(data: specificDataType) => setDataInLeagueBlockData(data)}
          />
        ) : (
          <LeagueStats
            league={leagueData.league}
            season={season}
            setData={(data: specificDataType) => setDataInLeagueBlockData(data)}
          />
        )}
      </Container>
    </React.Fragment>
  )
}
export default LeagueDetail
