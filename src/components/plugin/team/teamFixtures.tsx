import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { FixtureType, TeamStatisticType, TeamType } from '@/types'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import FixtureTable from '../common/fixtureTable'

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
}
const TeamFixtures = ({ team }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const { currentSeason } = useCurrentSeason()
  const [fixtures, setFixtures] = useState<FixtureType[]>([])
  const [page, setPage] = useState<number>(1)

  const getFixturesData = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/fixtures', {
      params: {
        team: team.team.id,
        season: currentSeason,
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

  return (
    <React.Fragment>
      <Container>
        {fixtures.map((f) => {
          return (
            <BoxContainer key={f.fixture.id}>
              <DateContainer>
                <DateLabel>{f.fixture.date.substring(0, 10)}</DateLabel>
                <LeagueLabel>{f.league.name}</LeagueLabel>
              </DateContainer>
              <FixtureTable key={f.fixture.id} fixture={f} />
            </BoxContainer>
          )
        })}
        <ViewLabel onClick={() => setPage(page + 1)}>View next matches</ViewLabel>
      </Container>
    </React.Fragment>
  )
}

export default TeamFixtures
