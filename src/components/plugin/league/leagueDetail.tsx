import useAxios from '@/hooks/useAxios'
import { CountryType, LeagueType, SeasonType } from '@/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import LeagueDetailTitle from './leagueDetailTitle'

import styled from 'styled-components'
import MenuBar from '../common/menuBar'
import LeagueFixtures from './leagueFixtures'
import LeagueStanding from '../common/leagueStanding'
import LeagueStats from './leagueStats'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'

const Container = styled.div`
  overflow-y: scroll;
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

const LeagueDetail = ({ leagueId, blockId }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const menu = ['Table', 'Fixtures', 'Stats']
  const today = useMemo(() => dayjs(), [])

  const [leagueData, setLeagueData] = useState<LeagueDataType>()
  const [selectedMenu, setSelectedMenu] = useState<string>('Table')
  const [season, setSeason] = useState<number>(today.year() - 1)

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
          <LeagueStanding league={leagueData.league} season={season} />
        ) : selectedMenu === 'Fixtures' ? (
          <LeagueFixtures league={leagueData.league} season={season} />
        ) : (
          <LeagueStats league={leagueData.league} season={season} />
        )}
      </Container>
    </React.Fragment>
  )
}
export default LeagueDetail
