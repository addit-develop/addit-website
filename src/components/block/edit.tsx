import { COLORS } from '@/constants/constants'
import { default as React, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { BlockDataType } from '@/types'
import rootReducer, { RootState } from '@/store/reducers'

import EmptyBlock from './emptyBlock'
import FixtureListByLeague from './fixtureListByLeague'
import MatchDetailBlock from './matchDetailBlock'
import MatchPredictionBlock from './matchPredictionBlock'

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  background-color: transparent;
`

interface Props {
  blockId: string
}

const FootballBlockEdit = ({ blockId }: Props) => {
  const { blockDataList } = useSelector((state: RootState) => state.postReducer)
  const [blockData, setBlockData] = useState<BlockDataType | undefined>()

  useEffect(() => {
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
