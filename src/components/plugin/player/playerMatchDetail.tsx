import { COLORS } from '@/constants/constants'
import { PlayerMatchStatsType, FixtureType } from '@/types'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import PlayerInfoBox from '../common/playerInfoBox'
import FixtureTable from '../common/fixtureTable'
import PlayerMatchStats from './playerMatchStats'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.lightgray};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 2px;
  &::-webkit-scrollbar {
    display: none;
  }
`

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

interface PropsType {
  data: {
    playerData: PlayerMatchStatsType
    fixtureData: FixtureType
    teamData: {
      id: number
      name: string
      logo: string
    }
  }
  selectMode: boolean
  blockId: string
}

const PlayerMatchDetail = ({ data, selectMode, blockId }: PropsType) => {
  const playerDataFilled = useMemo(
    () => ({
      player: {
        ...data.playerData?.player,
        nationality: '',
      },
      statistics: [{ team: data.teamData }],
    }),
    [data]
  )

  if (!data.playerData && !data.fixtureData) return null
  return (
    <React.Fragment>
      <Container>
        <PlayerInfoBox playerData={playerDataFilled} />
        <MatchContainer>
          <Round>
            {data.fixtureData.league?.name} {data.fixtureData.league?.round}
          </Round>
          <FixtureTable fixture={data.fixtureData} />
        </MatchContainer>
        <PlayerMatchStats data={data.playerData?.statistics[0]} />
      </Container>
    </React.Fragment>
  )
}

export default PlayerMatchDetail
