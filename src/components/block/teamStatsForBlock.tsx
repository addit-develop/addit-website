import { COLORS } from '@/constants/constants'
import { TeamStatisticType } from '@/types'
import React from 'react'
import styled from 'styled-components'
import BoldTitleBox from '../plugin/common/boldTitleBox'
import PercentageBar from '../plugin/common/percentageBar'

const Container = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  display: flex;
  padding: 4px 0px;
  flex-direction: column;
  border-radius: 10px;
  gap: 8px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`

const StatTitle = styled.div`
  font-size: 16px;
  min-width: 48px;
`
const StatNumber = styled.div`
  font-size: 18px;
  font-weight: 500;
`
interface PropsType {
  data: {
    fixtures: boolean
    formation: boolean
    cleanSheets: boolean
    failedToScore: boolean
    averageGoals: boolean
    teamData: TeamStatisticType
  }
}

const TeamStats = ({ data }: PropsType) => {
  return (
    <React.Fragment>
      {data?.fixtures && (
        <Container>
          <BoldTitleBox style={{ padding: '8px' }}>
            Fixtures
            <div>
              <span style={{ color: COLORS.blue }}>W</span>
              {' / '}
              <span style={{ color: COLORS.darkgray }}>D</span>
              {' / '}
              <span style={{ color: COLORS.red }}>L</span>
            </div>
          </BoldTitleBox>
          <Row>
            <StatTitle>Home</StatTitle>
            <PercentageBar
              data={[
                data.teamData.fixtures.wins.home,
                data.teamData.fixtures.draws.home,
                data.teamData.fixtures.loses.home,
              ]}
            />
          </Row>
          <Row>
            <StatTitle>Away</StatTitle>
            <PercentageBar
              data={[
                data.teamData.fixtures.wins.away,
                data.teamData.fixtures.draws.away,
                data.teamData.fixtures.loses.away,
              ]}
            />
          </Row>
        </Container>
      )}
      {data?.formation && (
        <Container>
          <BoldTitleBox style={{ padding: '8px' }}>Formation</BoldTitleBox>
          {data.teamData.lineups.map((l) => {
            return (
              <Row key={l.formation}>
                <StatTitle>{l.formation}</StatTitle>
                <StatNumber>{l.played}</StatNumber>
              </Row>
            )
          })}
        </Container>
      )}
      {data?.cleanSheets && (
        <Container>
          <BoldTitleBox style={{ padding: '8px' }}>Clean Sheets</BoldTitleBox>
          <Row>
            <StatTitle>Home</StatTitle>
            <StatNumber>{data.teamData.clean_sheet.home}</StatNumber>
          </Row>
          <Row>
            <StatTitle>Away</StatTitle>
            <StatNumber>{data.teamData.clean_sheet.away}</StatNumber>
          </Row>
        </Container>
      )}
      {data?.failedToScore && (
        <Container>
          <BoldTitleBox style={{ padding: '8px' }}>Failed to score</BoldTitleBox>
          <Row>
            <StatTitle>Home</StatTitle>
            <StatNumber>{data.teamData.failed_to_score.home}</StatNumber>
          </Row>
          <Row>
            <StatTitle>Away</StatTitle>
            <StatNumber>{data.teamData.failed_to_score.away}</StatNumber>
          </Row>
        </Container>
      )}
      {data?.averageGoals && (
        <Container>
          <BoldTitleBox style={{ padding: '8px' }}>
            Average Goals
            <div>
              <span style={{ color: COLORS.blue }}>for</span>
              {' / '}
              <span style={{ color: COLORS.red }}>against</span>
            </div>
          </BoldTitleBox>
          <Row>
            <StatTitle>Home</StatTitle>
            <StatNumber>
              <span style={{ color: COLORS.blue }}>{data.teamData.goals.for.average.home}</span>
              {' / '}
              <span style={{ color: COLORS.red }}>{data.teamData.goals.against.average.home}</span>
            </StatNumber>
          </Row>
          <Row>
            <StatTitle>Away</StatTitle>
            <StatNumber>
              <span style={{ color: COLORS.blue }}>{data.teamData.goals.for.average.away}</span>
              {' / '}
              <span style={{ color: COLORS.red }}>{data.teamData.goals.against.average.away}</span>
            </StatNumber>
          </Row>
        </Container>
      )}
    </React.Fragment>
  )
}

export default TeamStats
