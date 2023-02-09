import * as Styles from './matchDetail-st'
import { default as React, useCallback } from 'react'
import { COLORS } from '@/constants/constants'
import { MatchDetailDataType } from '@/types'
import { CardIcon, SoccerBallIcon, SoccerBallLineIcon, SubstituteIcon } from '@/assets/icons'

interface PropsType {
  matchData: MatchDetailDataType | undefined
  eventList:
    | {
        firstHalf: any[]
        firstHalfExtra?: any[]
        secondHalf: any[]
        secondHalfExtra?: any[]
        extraTime?: any[]
        penalty?: any[]
      }
    | undefined
}

const MatchTimeline = ({ matchData, eventList }: PropsType) => {
  const eventIcon = useCallback((eventType: string) => {
    switch (eventType) {
      case 'Goal':
        return <SoccerBallIcon width={20} height={20} />
      case 'subst':
        return <SubstituteIcon width={20} height={20} />
      case 'Yellow Card':
        return <CardIcon width={20} height={20} fill={'#F8BF00'} />
      case 'Red Card':
        return <CardIcon width={20} height={20} fill={'#FF3131'} />
      case 'Goal cancelled':
        return <SoccerBallLineIcon fill={COLORS.darkgray} />
    }
  }, [])

  const getName = useCallback(
    (data: any) => {
      switch (data.type) {
        case 'Goal':
          return (
            <div>
              {data.player.name}
              {data.assist.name ? <span>assist by {data.assist.name}</span> : null}
            </div>
          )
        case 'subst':
          return (
            <p>
              {data.assist.name}
              <br />
              {data.player.name}
            </p>
          )
        default:
          return <div>{data.player.name}</div>
      }
    },
    [matchData]
  )

  const getEventElement = useCallback(
    (type: string, data: any) => {
      switch (type) {
        case 'normal':
          return (
            <Styles.Event team={data.team.name === matchData?.teams.home.name ? 'home' : 'away'}>
              {data.time.elapsed}
              {eventIcon(data.type === 'Card' || data.type === 'Var' ? data.detail : data.type)}
              {getName(data)}
            </Styles.Event>
          )
        case 'extra':
          return (
            <Styles.Event team={data.team.name === matchData?.teams.home.name ? 'home' : 'away'}>
              {data.time.elapsed}
              {eventIcon(data.type === 'Card' || data.type === 'Var' ? data.detail : data.type)}
              {getName(data)}
            </Styles.Event>
          )
        case 'overtime':
          return (
            <Styles.Event team={data.team.name === matchData?.teams.home.name ? 'home' : 'away'}>
              {data.time.elapsed}
              {eventIcon(data.type === 'Card' || data.type === 'Var' ? data.detail : data.type)}
              {getName(data)}
            </Styles.Event>
          )
        case 'penalty':
          return (
            <Styles.Event team={data.team.name === matchData?.teams.home.name ? 'home' : 'away'}>
              {data.time.elapsed}
              {eventIcon(data.type === 'Card' || data.type === 'Var' ? data.detail : data.type)}
              {getName(data)}
            </Styles.Event>
          )
      }
    },
    [matchData]
  )

  return (
    <React.Fragment>
      <Styles.Timeline>
        <Styles.SubTitle>Timeline</Styles.SubTitle>
        {eventList?.firstHalf.map((x) => getEventElement('normal', x))}
        {eventList?.firstHalfExtra?.map((x) => getEventElement('extra', x))}
        <span>
          - HT {matchData?.score.halftime.home}:{matchData?.score.halftime.away} -
        </span>
        {eventList?.secondHalf.map((x) => getEventElement('normal', x))}
        {eventList?.secondHalfExtra?.map((x) => getEventElement('extra', x))}
        <span>
          - FT {matchData?.score.fulltime.home}:{matchData?.score.fulltime.away} -
        </span>
        {eventList?.extraTime?.map((x) => getEventElement('overtime', x))}
        {matchData?.score.extratime.home ? (
          <span>
            - AET {matchData?.score.extratime.home}:{matchData?.score.extratime.away} -
          </span>
        ) : null}
        {eventList?.penalty?.map((x) => getEventElement('penalty', x))}
        {matchData?.score.extratime.home ? (
          <span>
            - PEN {matchData?.score.penalty.home}:{matchData?.score.penalty.away} -
          </span>
        ) : null}
      </Styles.Timeline>
    </React.Fragment>
  )
}

export default MatchTimeline
