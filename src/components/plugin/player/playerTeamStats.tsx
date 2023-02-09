import { ChevronDownIcon, ChevronUpIcon } from '@/assets/icons'
import { COLORS } from '@/constants/constants'
import { PlayerType, StatisticsType } from '@/types'
import React, { useState } from 'react'
import styled from 'styled-components'
import CircledImage from '../common/circledImage'

const Container = styled.div<{ expanded: boolean; forBlock: boolean }>`
  border-bottom: ${(props) =>
    props.expanded && props.forBlock ? 'none' : `1px solid ${COLORS.lightgray}`};
`
const LeaugeName = styled.div`
  margin-left: 8px;
`
const TeamTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StatRow = styled.div<{ expanded: boolean; forBlock: boolean }>`
  padding: 8px;
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: ${(props) => (props.expanded && !props.forBlock ? 'column' : 'row')};
  flex-wrap: wrap;
  justify-content: start;
  @media only screen and (max-width: 810px) {
    flex-direction: ${(props) => (props.expanded ? 'column' : 'row')};
    padding: ${(props) => (props.expanded ? '0px' : '8px')};
  }
`

const StatBox = styled.div<{ expanded: boolean; forBlock: boolean }>`
  flex-shrink: 0;
  width: ${(props) => (props.expanded ? (props.forBlock ? '25%' : '100%') : '20%')};
  height: ${(props) => props.forBlock && '80px'};
  font-size: 14px;
  display: flex;
  flex-direction: ${(props) => (props.expanded && !props.forBlock ? 'row' : 'column')};
  justify-content: ${(props) => (props.expanded && !props.forBlock ? 'space-between' : 'center')};
  gap: 16px;
  align-items: center;
  border-radius: 10px;
  border: ${(props) =>
    props.expanded && props.forBlock ? `1px solid ${COLORS.lightgray}` : 'none'};
  @media only screen and (max-width: 810px) {
    width: ${(props) => (props.expanded ? '100%' : '20%')};
    height: ${(props) => (props.expanded ? '40px' : '56px')};
    flex-direction: ${(props) => (props.expanded ? 'row' : 'column')};
    justify-content: ${(props) => (props.expanded ? 'space-between' : 'center')};
    border: none;
  }
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
  forBlock?: boolean
}

const PlayerTeamStats = ({ statistics, player, forBlock = false }: PropsType) => {
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
  const simpleStat: { [prop: string]: any } = {
    Position: games.position,
    Games: games.appearences || 0,
    Goals: goals.total || 0,
    Assists: goals.assists || 0,
    Rating: games.rating?.toString().substring(0, 5) || 'N/A',
  }
  const complexStat: { [prop: string]: any } = {
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
    'Dribbles success': `${dribbles.success} / ${dribbles.attempts}`,
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
      <Container expanded={expanded} forBlock={forBlock}>
        <TeamTitle>
          <CircledImage src={team.logo} width={24} height={24} />
          <LeaugeName>
            {league.name} / {team.name}
          </LeaugeName>
          <ExpandButton onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <ChevronDownIcon height="24" width="24" fill={COLORS.darkgray} />
            ) : (
              <ChevronUpIcon height="24" width="24" fill={COLORS.darkgray} />
            )}
          </ExpandButton>
        </TeamTitle>
        {expanded ? (
          <StatRow expanded={true} forBlock={forBlock}>
            {Object.keys(complexStat).map((k) => (
              <StatBox key={k} expanded={true} forBlock={forBlock}>
                <StatKey>{k}</StatKey>
                <StatValue rating={k === 'Rating'}>{complexStat[k] ? complexStat[k] : 0}</StatValue>
              </StatBox>
            ))}
          </StatRow>
        ) : (
          <StatRow expanded={false} forBlock={forBlock}>
            {Object.keys(simpleStat).map((k) => (
              <StatBox key={k} expanded={false} forBlock={forBlock}>
                <StatKey>{k}</StatKey>
                <StatValue rating={k === 'Rating'}>{simpleStat[k] ? simpleStat[k] : 0}</StatValue>
              </StatBox>
            ))}
          </StatRow>
        )}
      </Container>
    </React.Fragment>
  )
}

export default PlayerTeamStats
