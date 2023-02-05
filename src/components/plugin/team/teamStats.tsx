import { COLORS } from '@/constants/constants'
import { TeamStatisticType } from '@/types'
import React from 'react'
import styled from 'styled-components'
import BoldTitleBox from '../common/boldTitleBox'
import PercentageBar from '../common/percentageBar'

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
  team: TeamStatisticType
}

const TeamStats = ({ team }: PropsType) => {
  return (
    <React.Fragment>
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
            data={[team.fixtures.wins.home, team.fixtures.draws.home, team.fixtures.loses.home]}
          />
        </Row>
        <Row>
          <StatTitle>Away</StatTitle>
          <PercentageBar
            data={[team.fixtures.wins.away, team.fixtures.draws.away, team.fixtures.loses.away]}
          />
        </Row>
      </Container>
      <Container>
        <BoldTitleBox style={{ padding: '8px' }}>Formation</BoldTitleBox>
        {team.lineups.map((l) => {
          return (
            <Row key={l.formation}>
              <StatTitle>{l.formation}</StatTitle>
              <StatNumber>{l.played}</StatNumber>
            </Row>
          )
        })}
      </Container>
      <Container>
        <BoldTitleBox style={{ padding: '8px' }}>Clean Sheets</BoldTitleBox>
        <Row>
          <StatTitle>Home</StatTitle>
          <StatNumber>{team.clean_sheet.home}</StatNumber>
        </Row>
        <Row>
          <StatTitle>Away</StatTitle>
          <StatNumber>{team.clean_sheet.away}</StatNumber>
        </Row>
      </Container>
      <Container>
        <BoldTitleBox style={{ padding: '8px' }}>Failed to score</BoldTitleBox>
        <Row>
          <StatTitle>Home</StatTitle>
          <StatNumber>{team.failed_to_score.home}</StatNumber>
        </Row>
        <Row>
          <StatTitle>Away</StatTitle>
          <StatNumber>{team.failed_to_score.away}</StatNumber>
        </Row>
      </Container>
      <Container>
        <BoldTitleBox style={{ padding: '8px' }}>
          Averge Goals
          <div>
            <span style={{ color: COLORS.blue }}>for</span>
            {' / '}
            <span style={{ color: COLORS.red }}>against</span>
          </div>
        </BoldTitleBox>
        <Row>
          <StatTitle>Home</StatTitle>
          <StatNumber>
            <span style={{ color: COLORS.blue }}>{team.goals.for.average.home}</span>
            {' / '}
            <span style={{ color: COLORS.red }}>{team.goals.against.average.home}</span>
          </StatNumber>
        </Row>
        <Row>
          <StatTitle>Away</StatTitle>
          <StatNumber>
            <span style={{ color: COLORS.blue }}>{team.goals.for.average.away}</span>
            {' / '}
            <span style={{ color: COLORS.red }}>{team.goals.against.average.away}</span>
          </StatNumber>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default TeamStats
