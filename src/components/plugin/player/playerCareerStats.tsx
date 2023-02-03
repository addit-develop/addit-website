import { PlayerDataType } from '@/types'
import React from 'react'

interface PropsType {
  playerData: PlayerDataType
}
const PlayerCareerStats = ({ playerData }: PropsType) => {
  const statistics = playerData.statistics
  return (
    <React.Fragment>
      {playerData.statistics.map((s) => {
        return <div>{s.games.position}</div>
      })}
    </React.Fragment>
  )
}

export default PlayerCareerStats
