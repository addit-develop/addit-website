import { COLORS } from '@/constants/constants'
import { default as React, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import EmptyBlock from './emptyBlock'
import FixtureListByDate from './FixtureListByDate'
import { BlockDataType } from '@/types'
import rootReducer, { RootState } from '@/store/reducers'

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  background-color: transparent;
`

interface Props {
  id: string
}

const FootballBlock = ({ id }: Props) => {
  const { blockDataList } = useSelector((state: RootState) => state.postReducer)
  const [blockData, setBlockData] = useState<BlockDataType>(
    blockDataList.find((x: BlockDataType) => x.id === id)
  )

  useEffect(() => {
    setBlockData(blockDataList.find((x: BlockDataType) => x.id === id))
  }, [blockDataList])

  return (
    <React.Fragment>
      <BlockContainer>
        {blockData && blockData.isReady ? (
          <FixtureListByDate data={blockData.data} />
        ) : (
          <EmptyBlock />
        )}
      </BlockContainer>
    </React.Fragment>
  )
}

export default FootballBlock
