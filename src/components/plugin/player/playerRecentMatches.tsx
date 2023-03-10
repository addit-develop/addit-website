import { ChevronRightIcon } from '@/assets/icons'
import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { changeModalPage, loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import {
  FixtureType,
  PlayerDataType,
  PlayerMatchStatsType,
  PlayerShortType,
  TeamType,
} from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BoldTitleBox from '../common/boldTitleBox'
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
  display: flex;
  flex-direction: column;
  border-bottom: 1px ${COLORS.lightgray} solid;
  background-color: ${COLORS.white};
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

const MoreButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  color: ${COLORS.darkgray};
  padding: 2px 0px 10px 0px;
  cursor: pointer;
`

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
  playerData: PlayerDataType
  sendData: any
}

const PlayerRecentMatches = ({ playerData, sendData }: PropsType) => {
  const axios = useAxios()
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)

  const [recentMatches, setRecentMatches] = useState<FixtureType[]>([])

  const getRecentFixtures = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/fixtures', {
      params: {
        team: playerData.statistics[0].team.id,
        last: 3 * page,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    })
    setRecentMatches(res.data.response)
    sendData(res.data.response)
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getRecentFixtures()
  }, [page, playerData])

  return (
    <React.Fragment>
      <Container>
        <BoldTitleBox>Recent Matches</BoldTitleBox>
        {recentMatches.map((f) => {
          return (
            <BoxContainer key={f.fixture.id}>
              <DateContainer>
                <DateLabel>{f.fixture.date.substring(0, 10)}</DateLabel>
                <LeagueLabel>{f.league.name}</LeagueLabel>
              </DateContainer>
              <FixtureTable key={f.fixture.id} fixture={f} />
              <MoreButton
                onClick={() =>
                  dispatch(
                    changeModalPage('playerMatchDetail', 'Players', {
                      playerData: playerData,
                      fixtureData: f,
                    })
                  )
                }
              >
                Player Stats
                <ChevronRightIcon width={20} height={20} fill={COLORS.darkgray} />
              </MoreButton>
            </BoxContainer>
          )
        })}
        <ViewLabel onClick={() => setPage(page + 1)}>View more</ViewLabel>
      </Container>
    </React.Fragment>
  )
}

export default PlayerRecentMatches
