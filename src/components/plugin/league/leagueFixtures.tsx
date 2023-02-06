import useAxios from '@/hooks/useAxios'
import { FixtureType, LeagueType } from '@/types'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FixtureTable from '../common/fixtureTable'
import DateGroupedFixtures from './dateGroupedFixtures'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { RootState } from '@/store/reducers'
import SelectBox, { ElementContainer } from '../common/selectBox'

interface PropsType {
  league: LeagueType
  season: number
  setData?: any
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
`

const LeagueFixtures = ({ league, season, setData }: PropsType) => {
  const dispatch = useDispatch()
  const { selectMode } = useSelector((state: RootState) => state.pageReducer)
  const axios = useAxios()
  const today = useMemo(() => dayjs(), [])
  const [fixturesByDate, setFixturesByDate] = useState<
    { date: string; fixtures: FixtureType[]; selected: boolean }[]
  >([])

  const getFixturesData = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/fixtures', {
      params: {
        league: league.id,
        season: season,
        from: today.subtract(1, 'week').format('YYYY-MM-DD'),
        to: today.format('YYYY-MM-DD'),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    })
    const dateList: string[] = []
    const temp: { date: string; fixtures: FixtureType[]; selected: boolean }[] = []
    res.data.response.forEach((f: FixtureType) => {
      if (!dateList.includes(f.fixture.date.substring(0, 10))) {
        temp.push({ date: f.fixture.date.substring(0, 10), fixtures: [f], selected: false })
        dateList.push(f.fixture.date.substring(0, 10))
      } else temp[dateList.findIndex((x) => x === f.fixture.date.substring(0, 10))].fixtures.push(f)
    })
    setFixturesByDate(temp.reverse())
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getFixturesData()
  }, [season])

  const onSelect = useCallback(
    (index: number) => {
      const temp = fixturesByDate.slice()
      temp[index].selected = !temp[index].selected
      setData(temp.filter((x) => x.selected).map((x) => x.fixtures))
      setFixturesByDate(temp)
    },
    [fixturesByDate]
  )

  return (
    <React.Fragment>
      <Container>
        {!fixturesByDate ? (
          <div>There was no game during recent 7 days.</div>
        ) : (
          fixturesByDate.map((d, i) => {
            return (
              <ElementContainer key={i}>
                <SelectBox
                  selectMode={selectMode}
                  selected={d.selected}
                  onClick={() => onSelect(i)}
                />
                <DateGroupedFixtures fixtures={d.fixtures} />
              </ElementContainer>
            )
          })
        )}
      </Container>
    </React.Fragment>
  )
}

export default LeagueFixtures
