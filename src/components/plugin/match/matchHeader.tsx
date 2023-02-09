import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { MatchDetailDataType, FixtureType } from '@/types'
import { COLORS } from '@/constants/constants'
import dayjs, { Dayjs } from 'dayjs'
import MatchLineup from './matchLineup'
import MatchTimeline from './matchTimeline'
import { SoccerBallIcon } from '@/assets/icons'

interface PropsType {
  matchData: MatchDetailDataType | FixtureType | undefined
  scorerList?: { home: any[]; away: any[] } | undefined
}

const MatchHeader = ({ matchData, scorerList }: PropsType) => {
  const time: string[] | null = matchData?.fixture.date.match(/([0-9]{2})\:([0-9]{2})/g)
  const date: string = dayjs(matchData?.fixture.date, 'YYYY-MM-DDTHH:mmZ').format(
    'D MMM YYYY, HH:mm'
  )

  return (
    <React.Fragment>
      <Styles.Header>
        <Styles.Round>
          {matchData?.league.name} {matchData?.league.round}
        </Styles.Round>
        <Styles.ResultContainer>
          <Styles.TeamContainer>
            <Styles.Flag src={matchData?.teams.home.logo} />
            {matchData?.teams.home.name}
          </Styles.TeamContainer>
          {matchData?.fixture.status.short === 'NS' ? (
            <Styles.Time>{time && time[0]}</Styles.Time>
          ) : (
            <Styles.Score>
              {matchData?.goals.home}:{matchData?.goals.away}
              <Styles.MatchTime>{matchData?.fixture.status.elapsed}</Styles.MatchTime>
            </Styles.Score>
          )}
          <Styles.TeamContainer>
            <Styles.Flag src={matchData?.teams.away.logo} />
            {matchData?.teams.away.name}
          </Styles.TeamContainer>
        </Styles.ResultContainer>
        {scorerList ? (
          <Styles.ScorersContainer>
            <Styles.Scorers team="home">
              {scorerList.home.map((x, i) => (
                <div key={i}>
                  {x.player.name} {x.time.elapsed}
                  {x.time.elapsed.extra ? ' + ' + x.time.elapsed.extra : ''}
                </div>
              ))}
            </Styles.Scorers>
            <SoccerBallIcon width={20} height={20} fill={COLORS.darkgray} />
            <Styles.Scorers team="away">
              {scorerList.away.map((x, i) => (
                <div key={i}>
                  {x.player.name} {x.time.elapsed}
                  {x.time.elapsed.extra ? ' + ' + x.time.elapsed.extra : ''}
                </div>
              ))}
            </Styles.Scorers>
          </Styles.ScorersContainer>
        ) : null}
        <Styles.Date>{date}</Styles.Date>
      </Styles.Header>
    </React.Fragment>
  )
}

export default MatchHeader
