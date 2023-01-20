import { default as React } from 'react'
import styled from 'styled-components'

const BlockContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: #f2f2f2;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #3981bf;
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
