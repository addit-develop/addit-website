import styled from 'styled-components'
import { COLORS } from '@/constants/constants'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2px;
  background-color: ${COLORS.lightgray};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
