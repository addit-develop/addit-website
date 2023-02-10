import { default as React, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { BlockDataType } from '@/types'
import { RootState } from '@/store/reducers'

import EmptyBlock from './emptyBlock'
import FixtureListByLeague from './fixtureListByLeague'
import MatchDetailBlock from './matchDetailBlock'
import MatchPredictionBlock from './matchPredictionBlock'
import LeagueDetailBlock from './leagueDetailBlock'
import PlayerDetailBlock from './playerDetailBlock'
import PlayerMatchDetailBlock from './playerMatchDetailBlock'
import TeamDetailBlock from './teamDetailBlock'

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  background-color: transparent;
`

interface Props {
  blockId: string
  savedblockData: BlockDataType
}

const FootballBlockEdit = ({ blockId, savedblockData }: Props) => {
  const { blockDataList } = useSelector((state: RootState) => state.postReducer)
  const [blockData, setBlockData] = useState<BlockDataType | undefined>(savedblockData)

  useEffect(() => {
    if (!savedblockData.isReady)
      setBlockData(blockDataList.find((x: BlockDataType) => x.id === blockId))
  }, [blockDataList])

  const getBlockElement = useCallback(
    (type: string) => {
      switch (type) {
        case 'Fixture_List_By_Date':
          return <FixtureListByLeague data={blockData?.data} />
        case 'Match_Detail':
          return <MatchDetailBlock data={blockData?.data} />
        case 'Match_Prediction':
          return <MatchPredictionBlock data={blockData?.data} />
        case 'League_Detail':
          return <LeagueDetailBlock data={blockData?.data} />
        case 'Player_Detail':
          return <PlayerDetailBlock data={blockData?.data} />
        case 'Player_Match_Detail':
          return <PlayerMatchDetailBlock data={blockData?.data} />
        case 'Team_Detail':
          return <TeamDetailBlock data={blockData?.data} />
      }
    },
    [blockData]
  )

  return (
    <React.Fragment>
      <BlockContainer>
        {blockData && blockData.isReady ? getBlockElement(blockData.type) : <EmptyBlock />}
      </BlockContainer>
    </React.Fragment>
  )
}

export default FootballBlockEdit
