import { COLORS } from '@/constants/constants'
import { FixtureType, PlayerDataType, PlayerShortType, TeamType } from '@/types'
import React from 'react'
import styled from 'styled-components'
import PlayerInfoBox from '../plugin/common/playerInfoBox'
import PlayerStatBox from '../plugin/player/playerStatBox'
import PlayerCareerStats from '../plugin/player/playerCareerStats'
import PlayerRecentMatches from './playerRecentMatchesForBlock'

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

interface PropsType {
  data: {
    statBox: boolean
    recentMatches: boolean
    careerStats: boolean
    playerData: PlayerDataType
    playerTeam: { team: TeamType; players: PlayerShortType[] }[]
    season: number
    matchData: FixtureType[]
  }
}

const PlayerDetailBlock = ({ data }: PropsType) => {
  if (!data.playerData) return null
  return (
    <React.Fragment>
      <BlockContainer>
        <PlayerInfoBox playerData={data.playerData} size="large" />
        {data.statBox ? (
          <PlayerStatBox playerData={data.playerData} playerTeam={data.playerTeam} />
        ) : null}
        {data.recentMatches ? <PlayerRecentMatches data={data.matchData} /> : null}
        {data.careerStats ? (
          <PlayerCareerStats data={data.playerData} season={data.season} forBlock />
        ) : null}
      </BlockContainer>
    </React.Fragment>
  )
}

export default PlayerDetailBlock
