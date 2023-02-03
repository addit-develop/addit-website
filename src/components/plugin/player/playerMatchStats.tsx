import { COLORS } from '@/constants/constants'
import { FixtureStatsType } from '@/types'
import React, { useMemo } from 'react'
import styled from 'styled-components'

const StatsContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${COLORS.white};
`

const SubTitle = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 8px;
  justify-content: start;
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid ${COLORS.lightgray};
`

const Stat = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  font-size: 14px;
  & #name {
    color: ${COLORS.darkgray};
  }
`

interface PropsType {
  data: FixtureStatsType
}

const PlayerMatchStats = ({ data }: PropsType) => {
  const processedData = useMemo(
    () => [
      {
        name: 'Position',
        value: data?.games.position,
      },
      {
        name: 'Rating',
        value: data?.games.rating,
      },
      {
        name: 'Minutes played',
        value: data?.games.minutes,
      },
      {
        name: 'Goals',
        value: data?.goals.total,
      },
      {
        name: 'Concede goals',
        value: data?.goals.conceded,
      },
      {
        name: 'Assists',
        value: data?.goals.assists,
      },
      {
        name: 'Total shots',
        value: data?.shots.total,
      },
      {
        name: 'Shot on target',
        value: data?.shots.total,
      },
      {
        name: 'Total shots',
        value: data?.shots.on,
      },
      {
        name: 'Accurate passes',
        value: `${Math.round(
          data?.passes.total * Number(data?.passes.accuracy?.replace(/^\D+/g, '')) * 0.01
        )}/${data?.passes.total}(${data?.passes.accuracy})`,
      },
      {
        name: 'Key passes',
        value: data?.passes.key,
      },
      {
        name: 'Dribbles success',
        value: `${data?.dribbles.success ? data.dribbles.success : 0}/${
          data?.dribbles.attempts ? data.dribbles.attempts : 0
        }`,
      },
      {
        name: 'Total tackles',
        value: data?.tackles.total,
      },
      {
        name: 'Blocks',
        value: data?.tackles.blocks,
      },
      {
        name: 'Interceptions',
        value: data?.tackles.interceptions,
      },
      {
        name: 'Drawn fouls',
        value: data?.fouls.drawn,
      },
      {
        name: 'Committed fouls',
        value: data?.fouls.committed,
      },
      {
        name: 'Yellow card',
        value: data?.cards.yellow,
      },
      {
        name: 'Red card',
        value: data?.cards.red,
      },
      {
        name: 'Won duels',
        value: `${data?.duels.won ? data.duels.won : 0}/${
          data?.duels.total ? data.duels.total : 0
        }`,
      },
    ],
    [data]
  )

  if (!data) return null
  return (
    <React.Fragment>
      <StatsContainer>
        <SubTitle>Match Stats</SubTitle>
        {processedData.map((x) => (
          <Stat>
            <div id="name">{x.name}</div>
            <div id="value">{x.value ? x.value : 0}</div>
          </Stat>
        ))}
      </StatsContainer>
    </React.Fragment>
  )
}

export default PlayerMatchStats
