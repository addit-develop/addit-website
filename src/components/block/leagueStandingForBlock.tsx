import { COLORS } from '@/constants/constants'
import { StandingDataType } from '@/types'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import LeagueStandingTeam from '../plugin/league/leagueStandingTeam'

const Container = styled.div`
  position: relative;
  margin-top: 2px;
  padding: 6px 8px 6px 8px;
  background-color: ${COLORS.white};
  border-radius: 10px;
`
const StandingIndex = styled.div`
  display: flex;
  flex-direction: row;
  height: 24px;
  gap: 12px;
  color: ${COLORS.darkgray};
  justify-content: flex-end;
  font-size: 12px;
`
const Index = styled.div`
  width: 16px;
  text-align: center;
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
  standingData: StandingDataType[]
  leagueId: number
  selectedTeamId?: number | undefined
}

const LeagueStanding = ({ standingData, leagueId, selectedTeamId }: PropsType) => {
  const [shorten, setShorten] = useState<boolean>(true)
  const shortenData = useMemo(() => {
    if (!selectedTeamId) return standingData.slice(0, 7)
    const selectedTeamIndex = standingData.findIndex((x) => x.team.id === selectedTeamId)
    if (selectedTeamIndex < 4) return standingData.slice(0, 7)
    else if (selectedTeamIndex < standingData.length - 3)
      return standingData.slice(selectedTeamIndex - 3, selectedTeamIndex + 4)
    else return standingData.slice(-7)
  }, [])

  return (
    <React.Fragment>
      <Container>
        <StandingIndex>
          <Index>PL</Index>
          <Index>W</Index>
          <Index>D</Index>
          <Index>L</Index>
          <Index>GD</Index>
          <Index>PTS</Index>
        </StandingIndex>
        {(shorten ? shortenData : standingData).map((team, i) => {
          return (
            <LeagueStandingTeam
              team={team}
              leagueId={leagueId}
              key={i}
              selected={team.team.id === selectedTeamId}
            />
          )
        })}
        <ViewLabel
          onClick={() => {
            setShorten(!shorten)
          }}
        >
          {shorten ? 'View more' : 'View less'}
        </ViewLabel>
      </Container>
    </React.Fragment>
  )
}

export default LeagueStanding
