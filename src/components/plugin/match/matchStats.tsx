import * as Styles from './matchDetail-st'
import { default as React, useCallback, useState, useEffect } from 'react'
import { MatchDetailDataType } from '@/types'

interface PropsType {
  matchData: MatchDetailDataType | undefined
}

const MatchStats = ({ matchData }: PropsType) => {
  return (
    <React.Fragment>
      <Styles.StatsContainer>
        <Styles.SubTitle>Stats</Styles.SubTitle>
        {matchData?.statistics[0].statistics.map((x: { type: string; value: any }, i: number) => (
          <Styles.Stat>
            <div>{x.value ? x.value : 0}</div>
            <div>{x.type}</div>
            <div>
              {matchData?.statistics[1].statistics[i].value
                ? matchData?.statistics[1].statistics[i].value
                : 0}
            </div>
          </Styles.Stat>
        ))}
      </Styles.StatsContainer>
    </React.Fragment>
  )
}

export default MatchStats
