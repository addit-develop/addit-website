import { COLORS } from '@/constants/constants'
import { FixtureType, LeagueBlockDataType } from '@/types'
import { default as React, useCallback, useState } from 'react'
import styled from 'styled-components'
import LeagueStanding from './leagueStandingForBlock'
import LeagueDetailTitle from '../plugin/league/leagueDetailTitle'

import DateGroupedFixtures from '../plugin/league/dateGroupedFixtures'
import LeagueStats from './leagueStatsForBlock'

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

interface Props {
  data: LeagueBlockDataType
}

const LeagueDetailBlock = ({ data }: Props) => {
  if (!data.leagueData) return null
  return (
    <React.Fragment>
      <BlockContainer>
        <LeagueDetailTitle league={data.leagueData.league} season={data.leagueData.season} />
        {data.tab === 'Table' ? (
          <LeagueStanding
            standingData={data.leagueData.data.standingData}
            leagueId={data.leagueData.league.id}
            selectedTeamId={data.leagueData.data.selectedTeamId}
          />
        ) : data.tab === 'Fixtures' ? (
          data.leagueData.data.map((d: FixtureType[], i: number) => (
            <DateGroupedFixtures key={i} fixtures={d} />
          ))
        ) : (
          <LeagueStats data={data.leagueData.data} />
        )}
      </BlockContainer>
    </React.Fragment>
  )
}

export default LeagueDetailBlock
