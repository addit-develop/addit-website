import { COLORS } from '@/constants/constants'
import { PlayerType, StatisticsType } from '@/types'
import React, { useState } from 'react'
import styled from 'styled-components'
import CircledImage from '../common/circledImage'

const Container = styled.div`
  border-bottom: 1px ${COLORS.lightgray} solid;
`
const LeaugeName = styled.div`
  margin-left: 8px;
`
const TeamTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StatRow = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
`

const StatBox = styled.div<{ expanded: boolean }>`
  flex: 1;
  height: ${(props) => props.expanded && 40}px;
  font-size: 14px;
  display: flex;
  flex-direction: ${(props) => (props.expanded ? 'row' : 'column')};
  justify-content: ${(props) => props.expanded && 'space-between'};
  gap: 16px;
  align-items: center;
`

const StatKey = styled.div`
  color: ${COLORS.darkgray};
`

const StatValue = styled.div<{ rating: boolean }>`
  color: ${(props) => (props.rating ? COLORS.blue : COLORS.black)};
`

const ExpandButton = styled.div`
  margin-left: auto;
  cursor: pointer;
`
interface PropsType {
  statistics: StatisticsType
  player: PlayerType
}

const PlayerTeamStats = ({ statistics, player }: PropsType) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const {
    games,
    offsides,
    substitutes,
    shots,
    goals,
    passes,
    tackles,
    duels,
    dribbles,
    fouls,
    cards,
    penalty,
    team,
    league,
  } = statistics
  const simpleStat = {
    Position: games.position,
    Games: games.appearences || 0,
    Goals: goals.total || 0,
    Assists: goals.assists || 0,
    Rating: games.rating?.toString().substring(0, 5) || 'N/A',
  }
  const complexStat = {
    'Subbed In': substitutes.in,
    'Subbed Out': substitutes.out,
    'Minutes played': games.minutes,
    'Shots on target': shots.on,
    'Shots off target': shots.total - shots.on,
    'Won penalty': penalty.won,
    'Scored penalty': penalty.scored,
    'Missed penalty': penalty.missed,
    'Key passes': passes.key,
    'Total Passes': passes.total,
    'Pass Accuracy': passes.accuracy,
    'Dribbles success/attempts': `${dribbles.success} / ${dribbles.attempts}`,
    'Total tackles': tackles.total,
    Blocks: tackles.blocks,
    Interceptions: tackles.interceptions,
    'Drawn fouls': fouls.drawn,
    'Committed fouls': fouls.committed,
    'Yellow card': cards.yellow,
    'Red card': cards.red + cards.yellowred,
  }
  return (
    <React.Fragment>
      <Container>
        <TeamTitle>
          <CircledImage src={team.logo} width={24} height={24} />
          <LeaugeName>
            {league.name} / {team.name}
          </LeaugeName>
          <ExpandButton onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z" fill={COLORS.darkgray} />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" fill={COLORS.darkgray} />
              </svg>
            )}
          </ExpandButton>
        </TeamTitle>
        {expanded ? (
          <>
            {Object.keys(complexStat).map((k) => (
              <StatBox key={k} expanded={true}>
                <StatKey>{k}</StatKey>
                <StatValue rating={k === 'Rating'}>{complexStat[k]}</StatValue>
              </StatBox>
            ))}
          </>
        ) : (
          <StatRow>
            {Object.keys(simpleStat).map((k) => (
              <StatBox key={k} expanded={false}>
                <StatKey>{k}</StatKey>
                <StatValue rating={k === 'Rating'}>{simpleStat[k]}</StatValue>
              </StatBox>
            ))}
          </StatRow>
        )}
      </Container>
    </React.Fragment>
  )
}

export default PlayerTeamStats
