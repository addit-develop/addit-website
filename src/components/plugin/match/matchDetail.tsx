import * as Styles from './matchDetail-st'
import { default as React } from 'react'

interface PropsType {
  fixtureId: number
  selectMode: boolean
  id: string
}

const MatchDetail = ({ fixtureId, selectMode, id }: PropsType) => {
  return (
    <React.Fragment>
      <Styles.Header>
        <Styles.Round></Styles.Round>
        <Styles.ResultContainer></Styles.ResultContainer>
      </Styles.Header>
      <Styles.Timeline>Timeline</Styles.Timeline>
      <Styles.Lineup>Lineup</Styles.Lineup>
      <Styles.Stats>Top Stats</Styles.Stats>
      <Styles.Stats>Shots</Styles.Stats>
    </React.Fragment>
  )
}

export default MatchDetail
