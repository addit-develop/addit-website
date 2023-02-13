import { default as React } from 'react'
import { COLORS } from '@/constants/constants'
import styled from 'styled-components'
import PlayerInfoBox from '../plugin/common/playerInfoBox'
import FixtureTable from '../plugin/common/fixtureTable'
import { FixtureStatsType, FixtureType, MatchDetailDataType, PlayerDataType } from '@/types'
import PlayerMatchStats from '../plugin/player/playerMatchStats'

interface PropsType {
  data: {
    stats: boolean
    playerData: PlayerDataType
    fixtureData: MatchDetailDataType | FixtureType
    statsData: FixtureStatsType
  }
}

const MatchContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.white};
`

const Round = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  color: ${COLORS.darkgray};
`

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

const PlayerMatchDetailBlock = ({ data }: PropsType) => {
  return (
    <React.Fragment>
      <BlockContainer>
        <PlayerInfoBox playerData={data.playerData} size="large" />
        <MatchContainer>
          <Round>
            {data.fixtureData.league?.name} {data.fixtureData.league?.round}
          </Round>
          <FixtureTable fixture={data.fixtureData} />
        </MatchContainer>
        {data.stats ? <PlayerMatchStats data={data.statsData} forBlock /> : null}
      </BlockContainer>
    </React.Fragment>
  )
}

export default PlayerMatchDetailBlock
