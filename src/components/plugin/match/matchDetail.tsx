import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { MatchDetailDataType } from '@/types'
import { COLORS } from '@/constants/constants'
import dayjs, { Dayjs } from 'dayjs'

interface PropsType {
  fixtureId: number | undefined
  selectMode: boolean
  id: string
}

const MatchDetail = ({ fixtureId, selectMode, id }: PropsType) => {
  if (fixtureId === undefined) {
    return (
      <React.Fragment>
        <Styles.Container>잘못된 접근입니다.</Styles.Container>
      </React.Fragment>
    )
  }
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
        console.log(newScorerList)
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

  const time: string[] | null = matchData?.fixture.date.match(/([0-9]{2})\:([0-9]{2})/g)
  const date: string = dayjs(matchData?.fixture.date, 'YYYY-MM-DDTHH:mmZ').format(
    'D MMM YYYY, HH:mm'
  )

  const eventIcon = useCallback((eventType: string) => {
    switch (eventType) {
      case 'Goal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
            <path d="M10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm3.729-9.833 1.146-.334.521-1.437q-.625-.917-1.479-1.573-.855-.656-1.917-1.011l-1.25.896v1.354ZM6.25 8.146l3-2.084V4.708L8 3.812q-1.062.355-1.927 1.001-.865.645-1.469 1.562l.521 1.458ZM4.708 13.75l1.521.042.688-.917-1.105-3.292-1.104-.312-1.208.937q.042.959.344 1.854.302.896.864 1.688ZM10 16.5q.542 0 1.062-.094.521-.094 1.042-.26l.458-1.458-.708-.938H8.125l-.687.938.458 1.458q.521.166 1.042.26.52.094 1.062.094Zm-1.708-4.25h3.416l1-2.979L10 7.375 7.292 9.271Zm7 1.521q.562-.792.864-1.688.302-.895.344-1.854l-1.208-.958-1.104.312-1.105 3.292.688.917Z" />
          </svg>
        )
      case 'subst':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28">
            <path
              data-name="Path 2280"
              d="m3.687.144 2.824 2.825a.5.5 0 0 1-.354.86H4.345v6.084a1.012 1.012 0 0 1-2.025 0V3.829H.508a.5.5 0 0 1-.354-.86L2.978.144a.507.507 0 0 1 .709 0z"
              transform="rotate(-90 9.903 4.282)"
              fill="#449765"
            ></path>
            <path
              data-name="Path 2279"
              d="M2.328 7.1V1.012a1.012 1.012 0 0 1 2.025 0V7.1h1.812a.5.5 0 0 1 .354.86l-2.824 2.811a.52.52 0 0 1-.719 0L.151 7.957A.5.5 0 0 1 .506 7.1z"
              transform="rotate(-90 15.876 4.39)"
              fill="#D56660"
            ></path>
          </svg>
        )
      case 'Yellow Card':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" width="16" height="20" rx="3" fill="#F8BF00" />
          </svg>
        )
      case 'Red Card':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" width="16" height="20" rx="3" fill="#FF3131" />
          </svg>
        )
    }
  }, [])

  const getEventElement = useCallback((type: string, data: any) => {
    switch (type) {
      case 'normal':
        return (
          <Styles.Event team={data.team.name === matchData?.teams.home.name ? 'home' : 'away'}>
            {data.time.elapsed}
            {eventIcon(data.type === 'Card' ? data.detail : data.type)}
            {data.player.name}
          </Styles.Event>
        )
      case 'extra':
        return (
          <Styles.Event team={data.team.name === matchData?.teams.home.name ? 'home' : 'away'}>
            {data.time.elapsed}
            {eventIcon(data.type === 'Card' ? data.detail : data.type)}
            {data.player.name}
          </Styles.Event>
        )
      case 'overtime':
        return (
          <Styles.Event team={data.team.name === matchData?.teams.home.name ? 'home' : 'away'}>
            {data.time.elapsed}
            {eventIcon(data.type === 'Card' ? data.detail : data.type)}
            {data.player.name}
          </Styles.Event>
        )
      case 'penalty':
        return (
          <Styles.Event team={data.team.name === matchData?.teams.home.name ? 'home' : 'away'}>
            {data.time.elapsed}
            {eventIcon(data.type === 'Card' ? data.detail : data.type)}
            {data.player.name}
          </Styles.Event>
        )
    }
  }, [])

  return (
    <React.Fragment>
      <Styles.Container>
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
        <Styles.Timeline>
          <Styles.SubTitle>Timeline</Styles.SubTitle>
          {eventList?.firstHalf.map((x) => getEventElement('normal', x))}
          {eventList?.firstHalfExtra?.map((x) => getEventElement('extra', x))}
          {eventList?.secondHalf.map((x) => getEventElement('normal', x))}
          {eventList?.secondHalfExtra?.map((x) => getEventElement('extra', x))}
          {eventList?.extraTime?.map((x) => getEventElement('overtime', x))}
          {eventList?.penalty?.map((x) => getEventElement('penalty', x))}
        </Styles.Timeline>
        <Styles.Lineup>
          <Styles.SubTitle>Lineup</Styles.SubTitle>
        </Styles.Lineup>
        <Styles.Stats>
          <Styles.SubTitle>Top Stats</Styles.SubTitle>
        </Styles.Stats>
        <Styles.Stats>
          <Styles.SubTitle>Shots</Styles.SubTitle>
        </Styles.Stats>
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchDetail
