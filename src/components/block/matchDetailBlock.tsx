import { default as React, useEffect, useCallback, useState } from 'react'
import { MatchDetailDataType } from '@/types'
import MatchHeader from '../plugin/match/matchHeader'
import MatchLineup from '../plugin/match/matchLineup'
import MatchTimeline from '../plugin/match/matchTimeline'
import MatchStats from '../plugin/match/matchStats'
import { COLORS } from '@/constants/constants'
import styled from 'styled-components'

interface PropsType {
  data: {
    timeline: boolean
    lineUp: boolean
    stats: boolean
    matchData: MatchDetailDataType | undefined
  }
}

interface scorerListType {
  home: any[]
  away: any[]
}

interface eventListType {
  firstHalf: any[]
  firstHalfExtra?: any[]
  secondHalf: any[]
  secondHalfExtra?: any[]
  extraTime?: any[]
  penalty?: any[]
}

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

const MatchDetailBlock = ({ data }: PropsType) => {
  const [scorerList, setScorerList] = useState<scorerListType>()
  const [eventList, setEventList] = useState<eventListType>()

  const getMatchData = useCallback(() => {
    const newScorerList = { home: new Array(), away: new Array() }
    const newEventList = {
      firstHalf: new Array(),
      firstHalfExtra: new Array(),
      secondHalf: new Array(),
      secondHalfExtra: new Array(),
      extraTime: new Array(),
      penalty: new Array(),
    }
    data.matchData?.events.forEach((x: any) => {
      if (x.type === 'Goal') {
        x.team.id === data.matchData?.teams.home.id
          ? newScorerList.home.push(x)
          : newScorerList.away.push(x)
      }
      if (x.time.elapsed < 46 && x.time.extra === null) {
        newEventList.firstHalf.push(x)
      } else if (x.time.elapsed === 45 && x.time.extra !== null) {
        newEventList.firstHalfExtra.push(x)
      } else if (x.time.elapsed > 45 && x.time.extra === null) {
        newEventList.secondHalf.push(x)
      } else if (x.time.elapsed === 90 && x.time.extra !== null) {
        newEventList.secondHalfExtra.push(x)
      } else if (x.time.elapsed > 90 && x.time.elapsed < 121) {
        newEventList.extraTime.push(x)
      } else {
        newEventList.penalty.push(x)
      }
    })
    // console.log(newEventList)
    setScorerList(newScorerList)
    setEventList(newEventList)
  }, [])

  useEffect(() => {
    getMatchData()
  }, [])

  return (
    <React.Fragment>
      <BlockContainer>
        <MatchHeader matchData={data.matchData} scorerList={scorerList} />
        {data.timeline ? <MatchTimeline matchData={data.matchData} eventList={eventList} /> : null}
        {data.lineUp ? <MatchLineup matchData={data.matchData} forBlock={true} /> : null}
        {data.stats ? <MatchStats matchData={data.matchData} /> : null}
      </BlockContainer>
    </React.Fragment>
  )
}

export default MatchDetailBlock
