import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import useCurrentSeason from '@/hooks/useCurrentSeason'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { PlayerDataType, PlayerShortType, PlayerType, TeamType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '@/store/reducers'
import PlayerInfoBox from '../plugin/common/playerInfoBox'
import PlayerStatBox from '../plugin/player/playerStatBox'
import PlayerRecentMatches from '../plugin/player/playerRecentMatches'
import PlayerCareerStats from '../plugin/player/playerCareerStats'

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
  }
}

const PlayerDetailBlock = ({ data }: PropsType) => {
  if (!data) return null
  return (
    <React.Fragment>
      <BlockContainer>
        <PlayerInfoBox playerData={data.playerData} />
        {data.statBox ? (
          <PlayerStatBox playerData={data.playerData} playerTeam={data.playerTeam} />
        ) : null}
        {data.recentMatches ? <PlayerRecentMatches playerData={data.playerData} /> : null}
        {data.careerStats ? (
          <PlayerCareerStats player={data.playerData.player} season={data.season} />
        ) : null}
      </BlockContainer>
    </React.Fragment>
  )
}

export default PlayerDetailBlock
