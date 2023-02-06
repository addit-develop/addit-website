import { COLORS } from '@/constants/constants'
import { ReactElement, ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

const Title = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  padding: 8px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`

interface PropsType {
  children: ReactNode
  style?: CSSProperties
}

const BoldTitleBox = ({ children, style }: PropsType) => {
  return <Title style={style}>{children}</Title>
}

export default BoldTitleBox
