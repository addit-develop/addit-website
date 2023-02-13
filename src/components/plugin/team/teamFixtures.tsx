import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { RootState } from '@/store/reducers'
import { FixtureType, TeamStatisticType, TeamType } from '@/types'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import FixtureTable from '../common/fixtureTable'
import SelectBox, { ElementContainer } from '../common/selectBox'

const Container = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 10px;
`

const BoxContainer = styled.div`
  width: 100%;
  border-bottom: 1px ${COLORS.lightgray} solid;
`

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  font-size: 14px;
`
const DateLabel = styled.div`
  color: ${COLORS.darkgray};
`
const LeagueLabel = styled.div``

const ViewLabel = styled.div`
  font-size: 14px;
  color: ${COLORS.darkgray};
  display: flex;
  padding: 10px 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

interface PropsType {
  team: TeamStatisticType
  setData?: any
}
const TeamFixtures = ({ team, setData }: PropsType) => {
  const dispatch = useDispatch()
  const { selectMode } = useSelector((state: RootState) => state.pageReducer)
  const axios = useAxios()
  const [fixtures, setFixtures] = useState<FixtureType[]>([])
  const [selectedList, setSelectedList] = useState<boolean[]>([])
  const [page, setPage] = useState<number>(1)

  const getFixturesData = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/fixtures', {
      params: {
        team: team.team.id,
        last: 5 * page,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    })
    setFixtures(res.data.response)
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getFixturesData()
  }, [team, page])

  useEffect(() => {
    setSelectedList(new Array(fixtures.length))
  }, [fixtures])

  const onSelect = useCallback((index: number) => {
    let temp = selectedList
    temp[index] = !selectedList[index]
    setData(fixtures.filter((_, i) => selectedList[i]))
    setSelectedList(temp)
  }, [])

  return (
    <React.Fragment>
      <Container>
        {fixtures.map((f, i) => {
          return (
            <ElementContainer key={f.fixture.id}>
              <SelectBox
                selectMode={selectMode}
                selected={selectedList[i]}
                onClick={() => onSelect(i)}
              />
              <BoxContainer>
                <DateContainer>
                  <DateLabel>{f.fixture.date.substring(0, 10)}</DateLabel>
                  <LeagueLabel>{f.league.name}</LeagueLabel>
                </DateContainer>
                <FixtureTable key={f.fixture.id} fixture={f} />
              </BoxContainer>
            </ElementContainer>
          )
        })}
        <ViewLabel onClick={() => setPage(page + 1)}>View prev matches</ViewLabel>
      </Container>
    </React.Fragment>
  )
}

export default TeamFixtures
