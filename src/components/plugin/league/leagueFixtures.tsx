import useAxios from '@/hooks/useAxios'
import { FixtureType, LeagueType } from '@/types'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import FixtureTable from '../common/fixtureTable'
import DateGroupedFixtures from './dateGroupedFixtures'

interface PropsType {
  league: LeagueType
  season: number
}

const LeagueFixtures = ({ league, season }: PropsType) => {
  const axios = useAxios()
  const today = useMemo(() => dayjs(), [])
  const [fixtures, setFixtures] = useState<FixtureType[]>([])
  const [dateList, setDateList] = useState<string[]>([])

  const getFixturesData = async () => {
    const res = await axios.get('/fixtures', {
      params: {
        league: league.id,
        season: season,
        from: today.subtract(1, 'week').format('YYYY-MM-DD'),
        to: today.format('YYYY-MM-DD'),
      },
    })
    setFixtures(res.data.response)
    let temp: string[] = []
    res.data.response.forEach((f: FixtureType) => {
      if (!temp.includes(f.fixture.date.substring(0, 10))) {
        temp.push(f.fixture.date.substring(0, 10))
      }
    })
    setDateList(temp.reverse())
  }

  useEffect(() => {
    getFixturesData()
  }, [season])

  return (
    <React.Fragment>
      {!dateList ? (
        <div>There was no game during recent 7 days.</div>
      ) : (
        dateList.map((d) => {
          return (
            <DateGroupedFixtures
              key={d}
              fixtures={fixtures.filter((f) => f.fixture.date.substring(0, 10) === d)}
              selectMode={false}
            />
          )
        })
      )}
    </React.Fragment>
  )
}

export default LeagueFixtures
