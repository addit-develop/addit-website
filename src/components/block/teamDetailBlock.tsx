import { default as React } from 'react'
import { COLORS } from '@/constants/constants'
import styled from 'styled-components'
import { TeamBlockDataType } from '@/types'
import TeamDetailTitle from '../plugin/team/teamDetailTitle'
import LeagueStanding from './leagueStandingForBlock'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import FixtureTable from '../plugin/common/fixtureTable'
import TeamSquad from './teamSquadForBlock'
import TeamStats from './teamStatsForBlock'
import TeamTransfer from './teamTransferForBlock'

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: scroll;
  background-color: ${COLORS.lightgray};
  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 10px;
  box-shadow: 0px 0.6px 1.8px -0.63px rgba(0, 0, 0, 0.05),
    0px 1.8px 5.4px -1.3px rgba(0, 0, 0, 0.05), 0px 4.8px 14.3px -1.9px rgba(0, 0, 0, 0.05),
    0px 15px 45px -2.5px rgba(0, 0, 0, 0.05);
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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

interface PropsType {
  data: TeamBlockDataType
}

const TeamDetailBlock = ({ data }: PropsType) => {
  const { currentSeason } = useCurrentSeason()

  if (!data.teamData) return null
  return (
    <React.Fragment>
      <BlockContainer>
        <TeamDetailTitle team={data.teamData.team.team} league={data.teamData.team.league} />
        <Content>
          {data.tab === 'Fixtures' ? (
            data.teamData.data.map((f: any) => (
              <BoxContainer key={f.fixture.id}>
                <DateContainer>
                  <DateLabel>{f.fixture.date.substring(0, 10)}</DateLabel>
                  <LeagueLabel>{f.league.name}</LeagueLabel>
                </DateContainer>
                <FixtureTable key={f.fixture.id} fixture={f} />
              </BoxContainer>
            ))
          ) : data.tab === 'Table' ? (
            <LeagueStanding
              standingData={data.teamData.data.standingData}
              leagueId={data.teamData.data.leagueId}
              selectedTeamId={data.teamData.data.selectedTeamId}
            />
          ) : data.tab === 'Squad' ? (
            <TeamSquad data={data.teamData.data} team={data.teamData.team.team} />
          ) : data.tab === 'Stats' ? (
            <TeamStats data={data.teamData.data} />
          ) : (
            <TeamTransfer data={data.teamData.data} team={data.teamData.team} />
          )}
        </Content>
      </BlockContainer>
    </React.Fragment>
  )
}

export default TeamDetailBlock
