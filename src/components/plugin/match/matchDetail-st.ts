import styled from 'styled-components'
import { COLORS } from '@/constants/constants'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: ${COLORS.white};
`

export const Header = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 8px;
`

export const Round = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  color: ${COLORS.darkgray};
`

export const ResultContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const TeamContainer = styled.div`
  width: 120px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  font-size: 16px;
`

export const Flag = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: contain;
  border: 1px solid ${COLORS.gray};
`

export const Time = styled.div`
  flex-shrink: 0;
  width: 72px;
  height: 100%;
  font-size: 28px;
  color: ${COLORS.darkgray};
  font-weight: 500;
  text-align: center;
  line-height: 60px;
`

export const Score = styled.div`
  flex-shrink: 0;
  width: 72px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 28px;
  color: ${COLORS.black};
  font-weight: 500;
  text-align: center;
`

export const MatchTime = styled.div`
  font-size: 14px;
  color: ${COLORS.blue};
`

export const ScorersContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 12px;
  font-size: 14px;
  color: ${COLORS.darkgray};
  & svg {
    flex-shrink: 0;
  }
`

export const Scorers = styled.div<{ team?: string }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: coulumn;
  gap: 4px;
  justify-content: ${(props) => (props.team === 'home' ? 'end' : 'start')};
`

export const Date = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  color: ${COLORS.darkgray};
  border: 1px 0 solid ${COLORS.darkgray};
`

export const SubTitle = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 8px;
  justify-content: start;
  font-size: 16px;
  font-weight: bold;
`

export const Timeline = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px 8px;
`

export const Event = styled.div<{ team?: string }>`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: ${(props) => (props.team === 'home' ? 'row' : 'row-reverse')};
  justify-content: ${(props) => (props.team === 'home' ? 'start' : 'end')};
  align-items: center;
  gap: 20px;
`

export const Lineup = styled.div``

export const Stats = styled.div``
