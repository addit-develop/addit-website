import { COLORS } from '@/constants/constants'
import { default as React, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BlockDataType } from '@/types'

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
