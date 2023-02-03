import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { useDispatch } from 'react-redux'
import { setBlockData } from '@/store/actions/postAction'
import { MatchDetailDataType } from '@/types'
import MatchHeader from './matchHeader'
import MatchLineup from './matchLineup'
import MatchTimeline from './matchTimeline'
import MatchStats from './matchStats'
import SelectBox from '../common/selectBox'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'

interface PropsType {
  fixtureId: number | undefined
  selectMode: boolean
  blockId: string
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

const MatchDetail = ({ fixtureId, selectMode, blockId }: PropsType) => {
  const dispatch = useDispatch()
  const [matchData, setMatchData] = useState<MatchDetailDataType>()
  const [scorerList, setScorerList] = useState<scorerListType>()
  const [eventList, setEventList] = useState<eventListType>()
  const [matchBlockData, setMatchBlockData] = useState<{
    timeline: boolean
    lineUp: boolean
    stats: boolean
    matchData: MatchDetailDataType | undefined
  }>({ timeline: false, lineUp: false, stats: false, matchData: matchData })

  useEffect(() => {
    if (matchBlockData) dispatch(setBlockData(blockId, matchBlockData))
  }, [matchBlockData])

  const axios = useAxios()
  const getMatchData = useCallback(async () => {
    dispatch(loadDataStart())
    const response = await axios
      .get('/fixtures', {
        params: { id: fixtureId, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      })
      .then((response) => {
        // console.log(response)
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
        // console.log(newEventList)
        setScorerList(newScorerList)
        setEventList(newEventList)
        setMatchBlockData({
          timeline: false,
          lineUp: false,
          stats: false,
          matchData: response.data.response[0],
        })
        dispatch(loadDataFinish())
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

  const selectElement = (type: string) => {
    switch (type) {
      case 'timeline':
        setMatchBlockData({ ...matchBlockData, timeline: !matchBlockData.timeline })
        break
      case 'lineUp':
        setMatchBlockData({ ...matchBlockData, lineUp: !matchBlockData.lineUp })
        break
      case 'stats':
        setMatchBlockData({ ...matchBlockData, stats: !matchBlockData.stats })
        break
    }
  }

  return (
    <React.Fragment>
      <Styles.Container>
        <MatchHeader matchData={matchData} scorerList={scorerList} />
        <Styles.ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={matchBlockData.timeline}
            onClick={() => selectElement('timeline')}
          />
          <MatchTimeline matchData={matchData} eventList={eventList} />
        </Styles.ElementContainer>
        <Styles.ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={matchBlockData.lineUp}
            onClick={() => selectElement('lineUp')}
          />
          <MatchLineup matchData={matchData} />
        </Styles.ElementContainer>
        <Styles.ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={matchBlockData.stats}
            onClick={() => selectElement('stats')}
          />
          <MatchStats matchData={matchData} />
        </Styles.ElementContainer>
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchDetail
