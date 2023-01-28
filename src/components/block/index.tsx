import { COLORS } from '@/constants/constants'
import { default as React, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import EmptyBlock from './emptyBlock'
import FixtureListByLeague from './FixtureListByLeague'
import { BlockDataType } from '@/types'
import rootReducer, { RootState } from '@/store/reducers'

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  background-color: transparent;
`

interface Props {
  blockId: string
}

const FootballBlock = ({ blockId }: Props) => {
  const { blockDataList } = useSelector((state: RootState) => state.postReducer)
  const [blockData, setBlockData] = useState<BlockDataType | undefined>(
    blockDataList.find((x: BlockDataType) => x.id === blockId)
  )

  useEffect(() => {
    setBlockData(blockDataList.find((x: BlockDataType) => x.id === blockId))
  }, [blockDataList])

  return (
    <React.Fragment>
      <BlockContainer>
        {blockData && blockData.isReady ? (
          <FixtureListByLeague data={blockData.data} />
        ) : (
          <EmptyBlock />
        )}
      </BlockContainer>
    </React.Fragment>
  )
}

export default FootballBlock
