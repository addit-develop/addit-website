import { default as React, useState, useEffect, useCallback, useMemo } from 'react'
import axios from 'axios'
import * as Styles from './style'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const LEAGUE_API = 'https://v3.football.api-sports.io/leagues'
const FIXTURE_API = 'https://api-football-v1.p.rapidapi.com/v3/fixtures'

const headers = {
  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
  'X-RapidAPI-Key': 'e1793446ebmsha8d1dabebc58f53p11a789jsnebca74dcc5bd',
}

const MatchHome = () => {
  const TodayDate = useMemo(() => dayjs(), [])

  const [date, setDate] = useState(TodayDate.format('YYYY-MM-DD'))
  const [fixtureData, setFixtureData] = useState(null)

  useEffect(() => {
    axios
      .request({
        method: 'GET',
        url: FIXTURE_API,
        params: { date },
        headers,
      })
      .then((response) => {
        setFixtureData(response)
        console.log(fixtureData)
      })
      .catch((err) => {
        setFixtureData(null)
        console.error(err)
      })
  }, [date])

  const prevDate = useCallback(() => {
    setDate(dayjs(date, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD'))
  }, [date])

  const nextDate = useCallback(() => {
    setDate(dayjs(date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD'))
  }, [date])

  const convertDate = useCallback((date) => {
    if (date === TodayDate.subtract(1, 'day')) {
      return 'Yesterday'
    } else if (date === TodayDate) {
      return 'Today'
    } else if (date === TodayDate.add(1, 'day')) {
      return 'Tomorrow'
    } else if (date.year() === '2023') {
      return date.format('D MMM')
    } else {
      return date.format('D MMM YY')
    }
  }, [])

  return (
    <React.Fragment>
      <Styles.Container>
        <Styles.Header>
          <Styles.DatePicker>
            <Styles.ArrowButton onClick={prevDate}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z" fill="#8A8A8A" />
              </svg>
            </Styles.ArrowButton>
            <Styles.DateContainer>
              <Styles.Date>{convertDate(dayjs(date, 'YYYY-MM-DD').subtract(1, 'day'))}</Styles.Date>
              <Styles.Date selected>{convertDate(dayjs(date, 'YYYY-MM-DD'))}</Styles.Date>
              <Styles.Date>{convertDate(dayjs(date, 'YYYY-MM-DD').add(1, 'day'))}</Styles.Date>
              <Styles.Date>{convertDate(dayjs(date, 'YYYY-MM-DD').add(2, 'day'))}</Styles.Date>
            </Styles.DateContainer>
            <Styles.ArrowButton onClick={nextDate}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z" fill="#8A8A8A" />
              </svg>
            </Styles.ArrowButton>
          </Styles.DatePicker>
        </Styles.Header>
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchHome
