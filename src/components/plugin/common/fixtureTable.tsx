import { default as React, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { FixtureType } from '@/types'
import { useDispatch } from 'react-redux'
import { changeModalPage } from '@/store/actions/pageAction'
import { getAllJSDocTagsOfKind } from 'typescript'

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
`

const Away = styled.div`
  width: 100%;
  font-size: 15px;
  text-align: start;
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
  const dispatch = useDispatch()
  const time: string[] | null = fixture.fixture.date.match(/([0-9]{2})\:([0-9]{2})/g)

  const moveToMatchDetail = useCallback(() => {
    dispatch(changeModalPage('matchDetail', 'Matches', fixture.fixture.id))
  }, [fixture])

  return (
    <React.Fragment>
      <FixtureContainer onClick={moveToMatchDetail}>
        <Home>{fixture.teams.home.name}</Home>
        <Flag src={fixture.teams.home.logo} />
        {fixture.fixture.status.short === 'NS' ? (
          <Time>{time && time[0]}</Time>
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
