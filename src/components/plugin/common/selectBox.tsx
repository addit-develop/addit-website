import { default as React, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'

export const ElementContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
`

const Box = styled.div<{ selectMode?: boolean; selected?: boolean }>`
  display: ${(props) => (props.selectMode ? 'flex' : 'none')};
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.selected ? 'transperant' : 'rgba(255, 255, 255, 0.8)')};
`

interface PropsType {
  selectMode: boolean
  selected: boolean
  onClick: any
}

const SelectBox = ({ selectMode, selected, onClick }: PropsType) => {
  return (
    <React.Fragment>
      <Box id="selectbox" selectMode={selectMode} selected={selected} onClick={onClick} />
    </React.Fragment>
  )
}

export default SelectBox
