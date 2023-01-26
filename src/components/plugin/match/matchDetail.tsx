import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { MatchDetailDataType } from '@/types'
import MatchHeader from './matchHeader'
import MatchLineup from './matchLineup'
import MatchTimeline from './matchTimeline'
import MatchStats from './matchStats'

interface PropsType {
  fixtureId: number | undefined
  selectMode: boolean
  blockId: string
}

const MatchDetail = ({ fixtureId, selectMode, blockId }: PropsType) => {
  const [matchData, setMatchData] = useState<MatchDetailDataType>()
  const [scorerList, setScorerList] = useState<{ home: any[]; away: any[] }>()
  const [eventList, setEventList] = useState<{
    firstHalf: any[]
    firstHalfExtra?: any[]
    secondHalf: any[]
    secondHalfExtra?: any[]
    extraTime?: any[]
    penalty?: any[]
  }>()

  const axios = useAxios()
  const getMatchData = useCallback(async () => {
    const response = await axios
      .get('/fixtures', { params: { id: fixtureId } })
      .then((response) => {
        console.log(response)
        setMatchData(response.data.response[0])
        const newScorerList = { home: new Array(), away: new Array() }
        const newEventList = {
          firstHalf: new Array(),
          firstHalfExtra: new Array(),
          secondHalf: new Array(),
          secondHalfExtra: new Array(),
          extraTime: new Array(),
          penalty: new Array(),
        }
        response.data.response[0].events.forEach((x: any) => {
          if (x.type === 'Goal') {
            x.team.id === response.data.response[0].teams.home.id
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
        console.log(newEventList)
        setScorerList(newScorerList)
        setEventList(newEventList)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [fixtureId])

  useEffect(() => {
    getMatchData()
  }, [])

  if (fixtureId === undefined) {
    return (
      <React.Fragment>
        <Styles.Container>잘못된 접근입니다.</Styles.Container>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Styles.Container>
        <MatchHeader matchData={matchData} scorerList={scorerList} />
        <MatchTimeline matchData={matchData} eventList={eventList} />
        <MatchLineup matchData={matchData} />
        <MatchStats matchData={matchData} />
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchDetail
