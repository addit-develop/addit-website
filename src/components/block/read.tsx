import { default as React, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BlockDataType } from '@/types'

import EmptyBlock from './emptyBlock'
import FixtureListByLeague from './fixtureListByLeague'
import MatchDetailBlock from './matchDetailBlock'
import MatchPredictionBlock from './matchPredictionBlock'
import LeagueDetailBlock from './leagueDetailBlock'
import PlayerDetailBlock from './playerDetailBlock'

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  background-color: transparent;
`

interface Props {
  blockData: BlockDataType
}

const FootballBlockRead = ({ blockData }: Props) => {
  const getBlockElement = useCallback(
    (type: string) => {
      switch (type) {
        case 'Fixture_List_By_Date':
          return <FixtureListByLeague data={blockData.data} />
        case 'Match_Detail':
          return <MatchDetailBlock data={blockData.data} />
        case 'Match_Prediction':
          return <MatchPredictionBlock data={blockData?.data} />
        case 'League_Detail':
          return <LeagueDetailBlock data={blockData?.data} />
        case 'Player_Detail':
          return <PlayerDetailBlock data={blockData?.data} />
      }
    },
    [blockData]
  )

  return (
    <React.Fragment>
      <BlockContainer>
        {blockData.data ? getBlockElement(blockData.type) : <EmptyBlock />}
      </BlockContainer>
    </React.Fragment>
  )
}

export default FootballBlockRead
