import { COLORS } from '@/constants/constants'
import { default as React } from 'react'
import styled from 'styled-components'

const BlockContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${COLORS.lightgray};
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.blue};
  text-align: center;
  line-height: 40px;
`

const SearchBlock = () => {
  return (
    <React.Fragment>
      <BlockContainer>Select content to add</BlockContainer>
    </React.Fragment>
  )
}

export default SearchBlock
