import { default as React, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { fixtureType, leagueType, LeagueBlockType } from '@/types'
import FixtureTable from '../fixtureTable'
import { produceWithPatches } from 'immer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlockData } from '../../../reducers/post'
import rootReducer from '../../../reducers/index'

type IRootState = ReturnType<typeof rootReducer>

const FixturesContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: ${COLORS.white};
  border-radius: 10px;
`

const SelectBox = styled.div<{ selectMode?: boolean }>`
  display: ${(props) => (props.selectMode ? 'flex' : 'none')};
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: background-color: rgba(0, 0, 0, 0.5);
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

const FixtureContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
`

interface PropType {
  fixtures: fixtureType[]
  league: leagueType
  selectMode: boolean
}

const LeagueFixtures = ({ fixtures, league, selectMode }: PropType) => {
  const dispatch = useDispatch()
  const { blockData } = useSelector((state: IRootState) => state.post)
  const [selectedFixtureList, setSelectedFixtureList] = useState<boolean[]>(
    fixtures.map(() => false)
  )
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [leagueBlockData, setLeagueBlockData] = useState<LeagueBlockType>({
    id: league.id,
    name: league.name,
    logo: league.logo,
    fixtures: [],
  })

  const [menuState, setMenuState] = useState<boolean>(true)

  //선택한 경기에 따라서 블록 데이터 수정
  useEffect(() => {
    setLeagueBlockData({ ...leagueBlockData, fixtures: [] })
    selectedFixtureList.forEach((x: boolean, i: number) => {
      if (x) {
        setLeagueBlockData({
          ...leagueBlockData,
          fixtures: [
            ...leagueBlockData.fixtures,
            {
              id: fixtures[i].fixture.id,
              date: fixtures[i].fixture.date,
              teams: {
                home: {
                  name: fixtures[i].teams.home.name,
                  logo: fixtures[i].teams.home.logo,
                },
                away: {
                  name: fixtures[i].teams.away.name,
                  logo: fixtures[i].teams.away.logo,
                },
              },
              score: fixtures[i].goals,
              elapse: fixtures[i].fixture.status.elapsed,
            },
          ],
        })
      }
    })
    setIsSelected(leagueBlockData.fixtures.length === 0 ? false : true)
    const leagueIndex = blockData.data.findIndex((x: LeagueBlockType) => x.id === league.id)
    if (isSelected) {
      if (leagueIndex !== -1) {
        blockData.splice(leagueIndex, 1, leagueBlockData)
        dispatch(setBlockData(blockData))
      } else dispatch(setBlockData({ ...blockData, leagueBlockData }))
    } else if (leagueIndex !== -1) {
      blockData.splice(leagueIndex, 1)
      dispatch(setBlockData(blockData))
    }
  }, [selectedFixtureList])

  const selectAll = useCallback(() => {
    setSelectedFixtureList(fixtures.map(() => !isSelected))
  }, [isSelected])

  const selectOne = useCallback(
    (index: number) => {
      setSelectedFixtureList(
        selectedFixtureList.map((b, i: number) =>
          i === index ? !selectedFixtureList[i] : selectedFixtureList[i]
        )
      )
    },
    [selectedFixtureList]
  )

  const openMenu = useCallback(() => {
    setMenuState(!menuState)
  }, [menuState])

  return (
    <React.Fragment>
      <FixturesContainer>
        <SelectBox selectMode={selectMode && !isSelected} onClick={selectAll} />
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
          ? fixtures.map((fixture, i) => (
              <FixtureContainer>
                <SelectBox
                  selectMode={selectMode && !selectedFixtureList[i]}
                  onClick={() => selectOne(i)}
                />
                <FixtureTable fixture={fixture} key={i} />
              </FixtureContainer>
            ))
          : null}
      </FixturesContainer>
    </React.Fragment>
  )
}

export default LeagueFixtures
