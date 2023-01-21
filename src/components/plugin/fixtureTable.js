import { default as React, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import * as colors from './colors'

const FixtureContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  cursor: pointer;
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
  border: 1px solid ${colors.gray};
`

const Time = styled.div`
  width: 47px;
  height: 100%;
  font-size: 15px;
  color: ${colors.darkgray};
  font-weight: 500;
  text-align: center;
  line-height: 60px;
`

const Score = styled.div`
  width: 47px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: ${colors.black};
  font-weight: 500;
  text-align: center;
`

const MatchTime = styled.div`
  font-size: 14px;
  color: ${colors.blue};
`

const FixtureTable = (props) => {
  return (
    <React.Fragment>
      <FixtureContainer>
        <Home>{props.data.teams.home.name}</Home>
        <Flag src={props.data.teams.home.logo} />
        {props.data.fixture.status.short === 'NS' ? (
          <Time>{props.data.fixture.date.match(/([0-9]{2})\:([0-9]{2})/g)[0]}</Time>
        ) : (
          <Score>
            {props.data.goals.home}:{props.data.goals.home}
            <MatchTime>{props.data.fixture.status.elapsed}'</MatchTime>
          </Score>
        )}
        <Flag src={props.data.teams.away.logo} />
        <Away>{props.data.teams.away.name}</Away>
      </FixtureContainer>
    </React.Fragment>
  )
}

export default FixtureTable
