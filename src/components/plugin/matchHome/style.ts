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

export const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${COLORS.white};
`

export const DatePicker = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border-radius: 20px;
  background-color: ${COLORS.lightgray};
`

export const DateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: hidden;
`

export const Date = styled.button<{ selected?: boolean }>`
  flex-shrink: 0;
  width: 100px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 16px;
  color: ${(props) => (props.selected ? COLORS.blue : COLORS.darkgray)};
  background-color: ${(props) => (props.selected ? COLORS.white : 'none')};
  box-shadow: ${(props) => (props.selected ? '1px 1px 2px 0px rgba(0, 0, 0, 0.25)' : 'none')};
`

export const ArrowButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LeaguesContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: start;
  align-items: center;
`

export const CountryName = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: ${COLORS.lightblack};
  cursor: pointer;
`
