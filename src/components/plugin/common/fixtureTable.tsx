import { default as React, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { FixtureType } from '@/types'
import { useDispatch } from 'react-redux'
import { changeModalPage } from '@/store/actions/pageAction'
import { getAllJSDocTagsOfKind } from 'typescript'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

const FixtureContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  background-color: ${COLORS.white};
`

const Home = styled.div`
  width: 100%;
  font-size: 15px;
  text-align: end;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Away = styled.div`
  width: 100%;
  font-size: 15px;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Flag = styled.img`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  object-fit: contain;
  border: 1px solid ${COLORS.gray};
`

const Time = styled.div`
  flex-shrink: 0;
  width: 47px;
  height: 100%;
  font-size: 15px;
  color: ${COLORS.darkgray};
  font-weight: 500;
  text-align: center;
  line-height: 60px;
`

const Score = styled.div`
  flex-shrink: 0;
  width: 47px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: ${COLORS.black};
  font-weight: 500;
  text-align: center;
`

const MatchTime = styled.div`
  font-size: 14px;
  color: ${COLORS.blue};
`
interface PropsType {
  fixture: FixtureType
}
const FixtureTable = ({ fixture }: PropsType) => {
  const FixtureDayjs = dayjs(fixture.fixture.date).tz(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const dispatch = useDispatch()
  const time: string = FixtureDayjs.format('HH:mm').toString()

  const moveToMatchDetail = useCallback(() => {
    dayjs().isBefore(FixtureDayjs)
      ? dispatch(changeModalPage('matchPrediction', 'Matches', fixture))
      : dispatch(changeModalPage('matchDetail', 'Matches', fixture.fixture.id))
  }, [fixture, FixtureDayjs])

  return (
    <React.Fragment>
      <FixtureContainer onClick={moveToMatchDetail}>
        <Home>{fixture.teams.home.name}</Home>
        <Flag src={fixture.teams.home.logo} />
        {fixture.fixture.status.short === 'NS' ? (
          <Time>{time}</Time>
        ) : (
          <Score>
            {fixture.goals.home}:{fixture.goals.away}
            <MatchTime>{fixture.fixture.status.elapsed}</MatchTime>
          </Score>
        )}
        <Flag src={fixture.teams.away.logo} />
        <Away>{fixture.teams.away.name}</Away>
      </FixtureContainer>
    </React.Fragment>
  )
}

export default FixtureTable
