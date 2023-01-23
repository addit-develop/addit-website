import { default as React, useState, useEffect, useCallback, useMemo } from 'react'
import * as Styles from './style'
import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { COLORS } from '@/constants/constants'
import LeagueFixtures from './leagueFixtures'
import Countries from '@/data/countriesData.json'
import MajorLeagues from '@/data/majorLeaguesData.json'
import { BlockDataType, FixtureBlockType, FixtureType, LeagueBlockType } from '@/types'
import useAxios from '@/hooks/useAxios'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlockType, setBlockData } from '../../../reducers/post'
import rootReducer from '../../../reducers/index'

type IRootState = ReturnType<typeof rootReducer>

dayjs.extend(relativeTime)

interface PropType {
  selectMode: boolean
}

const MatchHome = ({ selectMode }: PropType) => {
  const dispatch = useDispatch()
  const { blockData } = useSelector((state: IRootState) => state.post)

  const TodayDate = useMemo(() => dayjs(), [])

  const [date, setDate] = useState<string>(TodayDate.format('YYYY-MM-DD'))
  const [fixtureData, setFixtureData] = useState<FixtureType[]>([])
  const [leagueList, setLeagueList] = useState<LeagueBlockType[]>(new Array())
  const [majorLeaguesOpen, setMajorLeaguesOpen] = useState(true)

  const axios = useAxios()
  const getFixtureData = async () => {
    const response = await axios.get('/fixtures', { params: { date } })
    console.log(response)
    setFixtureData(response.data.response)
  }

  const makeFixtureBlock = () => {
    const fullDataList: LeagueBlockType[] = []
    const emptyFixtureList: LeagueBlockType[] = []
    fixtureData.forEach((x) => {
      const xBlockData: FixtureBlockType = {
        id: x.fixture.id,
        date: x.fixture.date,
        teams: {
          home: {
            name: x.teams.home.name,
            logo: x.teams.home.logo,
          },
          away: {
            name: x.teams.away.name,
            logo: x.teams.away.logo,
          },
        },
        score: x.goals,
        status: x.fixture.status.short,
        elapse: x.fixture.status.elapsed,
      }
      const index = fullDataList.findIndex((y: LeagueBlockType) => x.league.id === y.id)
      if (index === -1) {
        fullDataList.push({
          id: x.league.id,
          name: x.league.name,
          logo: x.league.logo,
          fixtures: [xBlockData],
        })
        emptyFixtureList.push({
          id: x.league.id,
          name: x.league.name,
          logo: x.league.logo,
          fixtures: [],
        })
      } else {
        fullDataList[index].fixtures.push(xBlockData)
      }
    })
    setLeagueList(fullDataList)
    dispatch(setBlockData(emptyFixtureList))
  }

  // reducer blockData 타입 설정
  useEffect(() => {
    dispatch(setBlockType('Fixture_List_By_Date'))
  }, [fixtureData])

  // 해당 날짜에 있는 경기 정보 불러오기, 불러온 경기 데이터를 리그 별로 분류, 경기가 있는 리그들의 정보를 reducer blockData에 반영
  useEffect(() => {
    getFixtureData()
    makeFixtureBlock()
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
              const leagueData = leagueList.find((x) => x.id === league.id)
              if (leagueData)
                return <LeagueFixtures data={leagueData} selectMode={selectMode} key={league.id} />
              else return null
            })}
        </Styles.LeaguesContainer>
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchHome
