import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { MatchDetailDataType } from '@/types'
import { COLORS } from '@/constants/constants'

interface PropsType {
  fixtureId: number
  selectMode: boolean
  id: string
}

const MatchDetail = ({ fixtureId, selectMode, id }: PropsType) => {
  const [matchData, setMatchData] = useState<MatchDetailDataType>()
  const [scorerList, setScorerList] = useState<{ home: any[]; away: any[] }>()

  const axios = useAxios()
  const getMatchData = useCallback(async () => {
    const response = await axios
      .get('/fixtures', { params: { id: fixtureId } })
      .then((response) => {
        console.log(response)
        setMatchData(response.data.response[0])
        const newScorerList = { home: new Array(), away: new Array() }
        response.data.response[0].events.forEach((x: any) => {
          if (x.type === 'Goal') {
            x.team.id === response.data.response[0].teams.home.id
              ? newScorerList.home.push(x)
              : newScorerList.away.push(x)
          }
        })
        console.log(newScorerList)
        setScorerList(newScorerList)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [fixtureId])

  useEffect(() => {
    getMatchData()
  }, [])

  const time: string[] | null = matchData?.fixture.date.match(/([0-9]{2})\:([0-9]{2})/g)

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
                <Styles.MatchTime>{matchData?.fixture.status.elapsed}'</Styles.MatchTime>
              </Styles.Score>
            )}
            <Styles.TeamContainer>
              <Styles.Flag src={matchData?.teams.away.logo} />
              {matchData?.teams.away.name}
            </Styles.TeamContainer>
          </Styles.ResultContainer>
          <Styles.ScorersContainer>
            <Styles.Scorers team="home">
              {scorerList?.home.map((x) => (
                <div>
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
              {scorerList?.away.map((x) => (
                <div>
                  {x.player.name} {x.time.elapsed}
                  {x.time.elapsed.extra ? ' + ' + x.time.elapsed.extra : ''}
                </div>
              ))}
            </Styles.Scorers>
          </Styles.ScorersContainer>
          <Styles.Date></Styles.Date>
        </Styles.Header>
        <Styles.Timeline>Timeline</Styles.Timeline>
        <Styles.Lineup>Lineup</Styles.Lineup>
        <Styles.Stats>Top Stats</Styles.Stats>
        <Styles.Stats>Shots</Styles.Stats>
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchDetail
