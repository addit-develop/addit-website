import styled from 'styled-components'
import { COLORS } from '@/constants/constants'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: scroll;
  background-color: ${COLORS.lightgray};
  &::-webkit-scrollbar {
    display: none;
  }
`

export const ElementContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
`

export const Header = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 8px;
  background-color: ${COLORS.white};
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
  padding: 0 8px;
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
  object-fit: contain;
`

export const Time = styled.div`
  flex-shrink: 0;
  width: 72px;
  height: 100%;
  font-size: 28px;
  color: ${COLORS.black};
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
  flex-direction: column;
  gap: 4px;
  text-align: ${(props) => (props.team === 'home' ? 'end' : 'start')};
`

export const Date = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  color: ${COLORS.darkgray};
  border-top: 1px solid ${COLORS.lightgray};
`

export const SubTitle = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 8px;
  justify-content: start;
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid ${COLORS.lightgray};
`

export const Timeline = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 0 8px;
  text-align: center;
  border-radius: 10px;
  background-color: ${COLORS.white};
  & > span {
    height: 40px;
    line-height: 40px;
    color: ${COLORS.darkgray};
    font-weight: bold;
  }
`

export const Event = styled.div<{ team?: string }>`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: ${(props) => (props.team === 'home' ? 'row' : 'row-reverse')};
  justify-content: ${(props) => (props.team === 'home' ? 'start' : 'end')};
  align-items: center;
  gap: 20px;
  padding: 0 8px;
  text-align: ${(props) => (props.team === 'home' ? 'start' : 'end')};
  & div {
    display: flex;
    flex-direction: column;
  }
  & span {
    font-size: 14px;
    color: ${COLORS.darkgray};
  }
  & p {
    font-size: 14px;
  }
`

export const LineupContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${COLORS.white};
`

export const Lineup = styled.div<{ forBlock?: boolean }>`
  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 451/783;
  display: flex;
  flex-direction: column;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 539 935' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1714_118)'%3E%3Crect width='539' height='935' fill='%2301935C'/%3E%3Cline y1='466.5' x2='539' y2='466.5' stroke='%230D9F68' stroke-width='3'/%3E%3Ccircle cx='269' cy='468' r='48.5' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M175 934.5V851C175 848.239 177.239 846 180 846H358C360.761 846 363 848.239 363 851V934.5' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M226 935V906C226 903.239 228.239 901 231 901H307C309.761 901 312 903.239 312 906V935' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M236 846.039C260.62 829.914 277 830.061 301.5 846.039' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M363 0.5V84C363 86.7614 360.761 89 358 89H180C177.239 89 175 86.7614 175 84V0.5' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M312 5.96046e-07V29C312 31.7614 309.761 34 307 34H231C228.239 34 226 31.7614 226 29V5.96046e-07' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M302 88.9612C277.38 105.086 261 104.939 236.5 88.9612' stroke='%230D9F68' stroke-width='3'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1714_118'%3E%3Crect width='539' height='935' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  ${(props) =>
    props.forBlock
      ? `@media only screen and (min-width: 810px) {
    aspect-ratio: 783/451;
    flex-direction: row;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 935 539' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1718_117)'%3E%3Crect width='539' height='935' transform='matrix(0 -1 1 0 0 539)' fill='%2301935C'/%3E%3Cline x1='466.5' y1='539' x2='466.5' stroke='%230D9F68' stroke-width='3'/%3E%3Ccircle cx='468' cy='270' r='48.5' transform='rotate(-90 468 270)' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M934.5 364H851C848.239 364 846 361.761 846 359V181C846 178.239 848.239 176 851 176H934.5' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M935 313H906C903.239 313 901 310.761 901 308V232C901 229.239 903.239 227 906 227H935' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M846.039 303C829.914 278.38 830.061 262 846.039 237.5' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M0.5 176H84C86.7614 176 89 178.239 89 181L89 359C89 361.761 86.7614 364 84 364H0.5' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M5.96046e-07 227H29C31.7614 227 34 229.239 34 232L34 308C34 310.761 31.7614 313 29 313H5.96046e-07' stroke='%230D9F68' stroke-width='3'/%3E%3Cpath d='M88.9612 237C105.086 261.62 104.939 278 88.9612 302.5' stroke='%230D9F68' stroke-width='3'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1718_117'%3E%3Crect width='539' height='935' fill='white' transform='matrix(0 -1 1 0 0 539)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  }`
      : null};
`

export const startingXI = styled.div<{ reverse?: boolean; forBlock?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => (props.reverse ? 'column-reverse' : 'column')};
  ${(props) =>
    props.forBlock
      ? `@media only screen and (min-width: 810px) {
    flex-direction: ${props.reverse ? 'row-reverse' : 'row'};
  }`
      : null};
`

export const startingXIRow = styled.div<{ forBlock?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${(props) =>
    props.forBlock
      ? `@media only screen and (min-width: 810px) {
        flex-direction: column;
      }`
      : null};
`

export const playerStarting = styled.div`
  position: relative;
  width: 50px;
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${COLORS.lightgray};
  overflow: visible;
  white-space: nowrap;
`

export const playerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`

export const playerRating = styled.div<{ starting?: boolean }>`
  ${(props) => (props.starting ? 'position: absolute;top: -3px;right: -10px;' : '')}
  width: 32px;
  height: 18px;
  background-color: #f08022;
  border-radius: 9px;
  line-height: 18px;
  text-align: center;
  color: #fff;
  font-size: 13px;
`

export const playerOutIcon = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='22' height='22' rx='11' fill='%23E55E5A'/%3E%3Cpath d='M12 18L6 12L12 6L13.062 7.062L8.875 11.25H18V12.75H8.875L13.062 16.938L12 18Z' fill='white'/%3E%3Crect x='1' y='1' width='22' height='22' rx='11' stroke='white' stroke-width='2'/%3E%3C/svg%3E%0A");
`

export const SubPlayerContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
`

export const SubPlayerList = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  &:first-child {
    border-right: 1px solid ${COLORS.lightgray};
  }
`

export const playerSub = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 15px;
  gap: 6px;
  padding: 2px 8px;
  & div:first-child {
    flex-shrink: 0;
    width: 18px;
    color: ${COLORS.darkgray};
  }
  & div:nth-child(2) {
    width: 100%;
    color: ${COLORS.black};
  }
`

export const StatsContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${COLORS.white};
`

export const Stat = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  font-size: 14px;
`
