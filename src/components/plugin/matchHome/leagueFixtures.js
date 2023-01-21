import { default as React, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import * as colors from '../colors'
import FixtureTable from '../fixtureTable'

const FixturesContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: ${colors.white};
  border-radius: 10px;
`

const LeagueTitle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: ${colors.black};
  cursor: pointer;
`

const LeagueName = styled.div`
  display: flex;
  cursor: pointer;
  gap: 4px;
`

const Flag = styled.img`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  object-fit: contain;
  border: 1px solid ${colors.gray};
`

const LeagueFixtures = (props) => {
  const [menuState, setMenuState] = useState(true)

  const openMenu = useCallback(() => {
    setMenuState(!menuState)
  }, [menuState])

  return (
    <React.Fragment>
      <FixturesContainer>
        <LeagueTitle onClick={openMenu}>
          <LeagueName>
            <Flag src={props.league.logo} />
            {props.league.name}
          </LeagueName>
          {menuState ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z" fill={colors.darkgray} />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" fill={colors.darkgray} />
            </svg>
          )}
        </LeagueTitle>
        {menuState ? props.data.map((fixture) => <FixtureTable data={fixture} />) : null}
      </FixturesContainer>
    </React.Fragment>
  )
}

export default LeagueFixtures
