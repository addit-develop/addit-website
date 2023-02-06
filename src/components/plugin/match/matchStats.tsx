import * as Styles from './matchDetail-st'
import { default as React, useMemo } from 'react'
import { MatchDetailDataType } from '@/types'
import styled from 'styled-components'

const Container = styled.div<{ forBlock: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 810px) {
    flex-direction: ${(props) => (props.forBlock ? 'row' : 'column')};
    flex-wrap: wrap;
    gap: ${(props) => (props.forBlock ? '4px' : '0')};
  }
`

interface PropsType {
  matchData: MatchDetailDataType | undefined
  forBlock?: boolean
}

const MatchStats = ({ matchData, forBlock = false }: PropsType) => {
  const shotStats = useMemo(() => {
    return [
      'Shots on Goal',
      'Shots off Goal',
      'Total Shots',
      'Blocked Shots',
      'Shots insidebox',
      'Shots outsidebox',
    ]
  }, [])
  const foulStats = useMemo(() => {
    return ['Fouls', 'Offsides', 'Yellow Cards', 'Red Cards', 'Shots outsidebox']
  }, [])
  const passStats = useMemo(() => {
    return ['Ball Possession', 'Total passes', 'Passes accurate', 'Passes %']
  }, [])
  const otherStats = useMemo(() => {
    return ['Corner Kicks', 'Goalkeeper Saves']
  }, [])

  return (
    <React.Fragment>
      <Container forBlock={forBlock}>
        <Styles.StatsContainer forBlock={forBlock}>
          <Styles.SubTitle>Passes and possesion</Styles.SubTitle>
          {matchData?.statistics[0].statistics.map((x: { type: string; value: any }, i: number) =>
            passStats.includes(x.type) ? (
              <Styles.Stat key={i}>
                <div>{x.value ? x.value : 0}</div>
                <div>{x.type}</div>
                <div>
                  {matchData?.statistics[1].statistics[i].value
                    ? matchData?.statistics[1].statistics[i].value
                    : 0}
                </div>
              </Styles.Stat>
            ) : null
          )}
        </Styles.StatsContainer>
        <Styles.StatsContainer forBlock={forBlock}>
          <Styles.SubTitle>Shots</Styles.SubTitle>
          {matchData?.statistics[0].statistics.map((x: { type: string; value: any }, i: number) =>
            shotStats.includes(x.type) ? (
              <Styles.Stat key={i}>
                <div>{x.value ? x.value : 0}</div>
                <div>{x.type}</div>
                <div>
                  {matchData?.statistics[1].statistics[i].value
                    ? matchData?.statistics[1].statistics[i].value
                    : 0}
                </div>
              </Styles.Stat>
            ) : null
          )}
        </Styles.StatsContainer>
        <Styles.StatsContainer forBlock={forBlock}>
          <Styles.SubTitle>Discipline</Styles.SubTitle>
          {matchData?.statistics[0].statistics.map((x: { type: string; value: any }, i: number) =>
            foulStats.includes(x.type) ? (
              <Styles.Stat key={i}>
                <div>{x.value ? x.value : 0}</div>
                <div>{x.type}</div>
                <div>
                  {matchData?.statistics[1].statistics[i].value
                    ? matchData?.statistics[1].statistics[i].value
                    : 0}
                </div>
              </Styles.Stat>
            ) : null
          )}
        </Styles.StatsContainer>
        <Styles.StatsContainer forBlock={forBlock}>
          <Styles.SubTitle>Others</Styles.SubTitle>
          {matchData?.statistics[0].statistics.map((x: { type: string; value: any }, i: number) =>
            otherStats.includes(x.type) ? (
              <Styles.Stat key={i}>
                <div>{x.value ? x.value : 0}</div>
                <div>{x.type}</div>
                <div>
                  {matchData?.statistics[1].statistics[i].value
                    ? matchData?.statistics[1].statistics[i].value
                    : 0}
                </div>
              </Styles.Stat>
            ) : null
          )}
        </Styles.StatsContainer>
      </Container>
    </React.Fragment>
  )
}

export default MatchStats
