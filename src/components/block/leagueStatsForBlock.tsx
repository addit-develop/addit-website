import {
  Container as LeagueStatsContainer,
  Index as LeagueStatsIndex,
  ViewMore as LeagueStatsViewMore,
} from '../plugin/league/leagueStats'
import PlayerInfoBox from '../plugin/common/playerInfoBox'
import React, { useCallback, useEffect, useState } from 'react'
import { PlayerDataType } from '@/types'

interface PropType {
  data: { type: string; data: PlayerDataType[] }[]
}

const LeagueStats = ({ data }: PropType) => {
  const [isOpenList, setIsOpenList] = useState<boolean[]>([false, false, false, false])
  const changeIsOpenList = useCallback(
    (index: number) => {
      const temp = isOpenList.slice()
      temp[index] = !temp[index]
      setIsOpenList(temp)
    },
    [isOpenList]
  )

  return (
    <React.Fragment>
      {data.map((d, i: number) => (
        <LeagueStatsContainer key={i}>
          <LeagueStatsIndex>{d.type}</LeagueStatsIndex>
          {d.data.slice(0, isOpenList[i] ? 10 : 3).map((p, index) => (
            <PlayerInfoBox key={index} playerData={p} stat={p.statistics[0].goals.total} />
          ))}
          <LeagueStatsViewMore onClick={() => changeIsOpenList(i)}>
            {isOpenList[i] ? 'View Less' : 'View More'}
          </LeagueStatsViewMore>
        </LeagueStatsContainer>
      ))}
    </React.Fragment>
  )
}

export default LeagueStats
