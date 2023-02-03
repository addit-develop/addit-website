import { default as React, useState, useEffect, useCallback, useMemo } from 'react'
import * as Styles from './matchHome-st'
import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { COLORS } from '@/constants/constants'
import MatchFixtures from './leagueGroupedFixtures'
import MajorLeagues from '@/data/majorLeaguesData.json'
import { FixtureType, LeagueBlockType } from '@/types'
import useAxios from '@/hooks/useAxios'
import { useDispatch } from 'react-redux'
import { makeBlockData, setBlockData } from '@/store/actions/postAction'
import LeagueGroupedFixtures from './leagueGroupedFixtures'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'

dayjs.extend(relativeTime)

interface PropsType {
  selectMode: boolean
  blockId: string
}

const MatchHome = ({ selectMode, blockId }: PropsType) => {
  const dispatch = useDispatch()
  const TodayDate = useMemo(() => dayjs(), [])
  const [date, setDate] = useState<string>(TodayDate.format('YYYY-MM-DD'))
  const [fixtureData, setFixtureData] = useState<FixtureType[]>([])
  const [majorLeaguesOpen, setMajorLeaguesOpen] = useState(true)
  const axios = useAxios()

  const makeFixtureBlock = (fixtures: FixtureType[]) => {
    const emptyFixtureList: LeagueBlockType[] = []
    let leagueIdList: number[] = []
    fixtures.forEach((x) => {
      if (!leagueIdList.includes(x.league.id)) {
        emptyFixtureList.push({
          id: x.league.id,
          name: x.league.name,
          logo: x.league.logo,
          fixtures: [],
        })
        leagueIdList.push(x.league.id)
      }
    })
    dispatch(setBlockData(blockId, emptyFixtureList))
  }

  // 해당 날짜에 있는 경기 정보 불러오기, 불러온 경기 데이터를 리그 별로 분류, 경기가 있는 리그들의 정보를 reducer blockData에 반영
  const getFixtureData = async () => {
    dispatch(loadDataStart())
    await axios
      .get('/fixtures', {
        params: { date, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      })
      .then((response) => {
        setFixtureData(response.data.response)
        makeFixtureBlock(response.data.response)
        dispatch(loadDataFinish())
      })
      .catch((err) => {
        setFixtureData([])
        console.error(err)
      })
  }

  // // 새로운 blockdata 생성
  // useEffect(() => {
  //   dispatch(makeBlockData(blockId, 'Fixture_List_By_Date'))
  // }, [])

  useEffect(() => {
    getFixtureData()
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
              const leagueFixtureData = fixtureData.filter((x) => x.league.id === league.id)
              if (leagueFixtureData.length)
                return (
                  <LeagueGroupedFixtures
                    fixtures={leagueFixtureData}
                    selectMode={selectMode}
                    blockId={blockId}
                    key={league.id}
                  />
                )
              else return null
            })}
        </Styles.LeaguesContainer>
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchHome
