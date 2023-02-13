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
  const axios = useAxios()
  const [fixtures, setFixtures] = useState<FixtureType[]>([])
  const [page, setPage] = useState<number>(1)

  const { selectMode } = useSelector((state: RootState) => state.pageReducer)
  const [selectedBoolean, setSelectedBoolean] = useState<boolean[]>([])

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
    setSelectedBoolean(res.data.response.map((x: any) => false))
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getFixturesData()
  }, [team, page])

  const onSelect = useCallback(
    (index: number) => {
      const temp = selectedBoolean.slice()
      temp[index] = !temp[index]
      setSelectedBoolean(temp)
      setData(fixtures.filter((x, i) => temp[i]))
    },
    [selectedBoolean, fixtures]
  )

  return (
    <React.Fragment>
      <Container>
        {fixtures.map((f, i) => {
          return (
            <ElementContainer>
              <SelectBox
                selectMode={selectMode}
                selected={selectedBoolean[i]}
                onClick={() => onSelect(i)}
              />
              <BoxContainer key={f.fixture.id}>
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
