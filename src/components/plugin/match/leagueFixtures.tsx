import { default as React, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { fixtureType, leagueType } from '@/types'
import FixtureTable from '../fixtureTable'

const FixturesContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: ${COLORS.white};
  border-radius: 10px;
`

const LeagueTitle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: ${COLORS.black};
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
  border: 1px solid ${COLORS.gray};
`

interface PropsType {
  fixtures: fixtureType[]
  league: leagueType
}

const LeagueFixtures = ({ fixtures, league }: PropsType) => {
  const [menuState, setMenuState] = useState<boolean>(true)

  const openMenu = useCallback(() => {
    setMenuState(!menuState)
  }, [menuState])

  return (
    <React.Fragment>
      <FixturesContainer>
        <LeagueTitle onClick={openMenu}>
          <LeagueName>
            <Flag src={league.logo} />
            {league.name}
          </LeagueName>
          {menuState ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z" fill={COLORS.darkgray} />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" fill={COLORS.darkgray} />
            </svg>
          )}
        </LeagueTitle>
        {menuState
          ? fixtures.map((fixture, i) => <FixtureTable fixture={fixture} key={i} />)
          : null}
      </FixturesContainer>
    </React.Fragment>
  )
}

export default LeagueFixtures
