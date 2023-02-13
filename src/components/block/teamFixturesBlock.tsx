import { COLORS } from '@/constants/constants'
import { FixtureType, LeagueBlockDataType } from '@/types'
import { default as React, useCallback, useState } from 'react'
import styled from 'styled-components'
import LeagueStanding from './leagueStandingForBlock'
import LeagueDetailTitle from '../plugin/league/leagueDetailTitle'

import DateGroupedFixtures from '../plugin/league/dateGroupedFixtures'
import LeagueStats from './leagueStatsForBlock'
import FixtureTable from '../plugin/common/fixtureTable'

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  box-shadow: 0px 0.6px 1.8px -0.63px rgba(0, 0, 0, 0.05),
    0px 1.8px 5.4px -1.3px rgba(0, 0, 0, 0.05), 0px 4.8px 14.3px -1.9px rgba(0, 0, 0, 0.05),
    0px 15px 45px -2.5px rgba(0, 0, 0, 0.05);
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

interface Props {
  data: FixtureType[]
}

const TeamFixturesBlock = ({ data }: Props) => {
  if (!data) return null
  return (
    <React.Fragment>
      <BlockContainer>
        {/* <LeagueDetailTitle league={data.leagueData.league} season={data.leagueData.season} /> */}
        {data.map((f, i) => {
          return (
            <BoxContainer key={i}>
              <DateContainer>
                <DateLabel>{f.fixture.date.substring(0, 10)}</DateLabel>
                <LeagueLabel>{f.league.name}</LeagueLabel>
              </DateContainer>
              <FixtureTable key={f.fixture.id} fixture={f} />
            </BoxContainer>
          )
        })}
      </BlockContainer>
    </React.Fragment>
  )
}

export default TeamFixturesBlock
