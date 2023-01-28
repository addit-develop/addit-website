import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { MatchDetailDataType } from '@/types'
import { COLORS } from '@/constants/constants'
import dayjs, { Dayjs } from 'dayjs'
import MatchLineup from './matchLineup'
import MatchTimeline from './matchTimeline'

interface PropsType {
  matchData: MatchDetailDataType | undefined
  scorerList: { home: any[]; away: any[] } | undefined
}

const MatchDetail = ({ matchData, scorerList }: PropsType) => {
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
        <Styles.ScorersContainer>
          <Styles.Scorers team="home">
            {scorerList?.home.map((x, i) => (
              <div key={i}>
                {x.player.name} {x.time.elapsed}
                {x.time.elapsed.extra ? ' + ' + x.time.elapsed.extra : ''}
              </div>
            ))}
          </Styles.Scorers>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
            <path
              d="M10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm3.729-9.833 1.146-.334.521-1.437q-.625-.917-1.479-1.573-.855-.656-1.917-1.011l-1.25.896v1.354ZM6.25 8.146l3-2.084V4.708L8 3.812q-1.062.355-1.927 1.001-.865.645-1.469 1.562l.521 1.458ZM4.708 13.75l1.521.042.688-.917-1.105-3.292-1.104-.312-1.208.937q.042.959.344 1.854.302.896.864 1.688ZM10 16.5q.542 0 1.062-.094.521-.094 1.042-.26l.458-1.458-.708-.938H8.125l-.687.938.458 1.458q.521.166 1.042.26.52.094 1.062.094Zm-1.708-4.25h3.416l1-2.979L10 7.375 7.292 9.271Zm7 1.521q.562-.792.864-1.688.302-.895.344-1.854l-1.208-.958-1.104.312-1.105 3.292.688.917Z"
              fill={COLORS.darkgray}
            />
          </svg>
          <Styles.Scorers team="away">
            {scorerList?.away.map((x, i) => (
              <div key={i}>
                {x.player.name} {x.time.elapsed}
                {x.time.elapsed.extra ? ' + ' + x.time.elapsed.extra : ''}
              </div>
            ))}
          </Styles.Scorers>
        </Styles.ScorersContainer>
        <Styles.Date>{date}</Styles.Date>
      </Styles.Header>
    </React.Fragment>
  )
}

export default MatchDetail