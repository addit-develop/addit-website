import { default as React, useState, useEffect, useCallback, useMemo } from 'react'
import axios from 'axios'
import * as Styles from './style'
import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { COLORS } from '@/constants/constants'
import LeagueFixtures from './leagueFixtures'
import Countries from '@/data/countriesData.json'
import MajorLeagues from '@/data/majorLeaguesData.json'
import { fixtureType } from '@/types'

dayjs.extend(relativeTime)

const FIXTURE_API = process.env.NEXT_PUBLIC_FIXTURE_API

const headers = {
  'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RapidAPI_Host,
  'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RapidAPI_Key,
}

const MatchHome = () => {
  const TodayDate = useMemo(() => dayjs(), [])

  const [date, setDate] = useState<string>(TodayDate.format('YYYY-MM-DD'))
  const [fixtureData, setFixtureData] = useState<fixtureType[]>([])
  const [majorLeaguesOpen, setMajorLeaguesOpen] = useState(true)

  useEffect(() => {
    axios
      .request({
        method: 'GET',
        url: FIXTURE_API,
        params: { date },
        headers,
      })
      .then((response) => {
        console.log(response)
        setFixtureData(response.data.response)
        console.log(fixtureData)
      })
      .catch((err) => {
        setFixtureData([])
        console.error(err)
      })
  }, [date])

  const prevDate = useCallback(() => {
    setDate(dayjs(date, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD'))
  }, [date])

  const nextDate = useCallback(() => {
    setDate(dayjs(date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD'))
  }, [date])

  const twoNextDate = useCallback(() => {
    setDate(dayjs(date, 'YYYY-MM-DD').add(2, 'day').format('YYYY-MM-DD'))
  }, [date])

  const convertDate = useCallback((date: Dayjs) => {
    const formatDate = date.format('YYYY-MM-DD')
    if (formatDate === TodayDate.subtract(1, 'day').format('YYYY-MM-DD')) {
      return 'Yesterday'
    } else if (formatDate === TodayDate.format('YYYY-MM-DD')) {
      return 'Today'
    } else if (formatDate === TodayDate.add(1, 'day').format('YYYY-MM-DD')) {
      return 'Tomorrow'
    } else if (date.year() === 2023) {
      return date.format('D MMM')
    } else {
      return date.format('D MMM YY')
    }
  }, [])

  const openMajorLeagues = useCallback(() => {
    setMajorLeaguesOpen(!majorLeaguesOpen)
  }, [majorLeaguesOpen])

  return (
    <React.Fragment>
      <Styles.Container>
        <Styles.Header>
          <Styles.DatePicker>
            <Styles.ArrowButton onClick={prevDate}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z" fill={COLORS.darkgray} />
              </svg>
            </Styles.ArrowButton>
            <Styles.DateContainer>
              <Styles.Date onClick={prevDate}>
                {convertDate(dayjs(date, 'YYYY-MM-DD').subtract(1, 'day'))}
              </Styles.Date>
              <Styles.Date selected>{convertDate(dayjs(date, 'YYYY-MM-DD'))}</Styles.Date>
              <Styles.Date onClick={nextDate}>
                {convertDate(dayjs(date, 'YYYY-MM-DD').add(1, 'day'))}
              </Styles.Date>
              <Styles.Date onClick={twoNextDate}>
                {convertDate(dayjs(date, 'YYYY-MM-DD').add(2, 'day'))}
              </Styles.Date>
            </Styles.DateContainer>
            <Styles.ArrowButton onClick={nextDate}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z" fill={COLORS.darkgray} />
              </svg>
            </Styles.ArrowButton>
          </Styles.DatePicker>
        </Styles.Header>
        <Styles.LeaguesContainer>
          <Styles.CountryName onClick={openMajorLeagues}>
            Major Leagues
            {majorLeaguesOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M5 13v-2h14v2Z" fill={COLORS.lightblack} />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" fill={COLORS.lightblack} />
              </svg>
            )}
          </Styles.CountryName>
          {majorLeaguesOpen &&
            fixtureData &&
            MajorLeagues.map((league) => {
              const fixtures = fixtureData.filter((fixture) => fixture.league.id === league.id)
              if (fixtures.length > 0) return <LeagueFixtures fixtures={fixtures} league={league} />
              else return null
            })}
        </Styles.LeaguesContainer>
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchHome
