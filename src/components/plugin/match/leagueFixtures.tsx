import {
  default as React,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { fixtureType, leagueType, LeagueBlockType, FixtureBlockType } from '@/types'
import FixtureTable from '../fixtureTable'
import { produceWithPatches } from 'immer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlockData } from '../../../reducers/post'
import rootReducer from '../../../reducers/index'
import { all } from 'axios'

type IRootState = ReturnType<typeof rootReducer>

const FixturesContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: ${COLORS.white};
  border-radius: 10px;
`

const SelectBox = styled.div<{ selectMode?: boolean; allSelected?: boolean }>`
  display: ${(props) => (props.selectMode ? 'flex' : 'none')};
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.allSelected ? 'transperant' : 'rgba(0, 0, 0, 0.5)')};
`

const LeagueTitle = styled.div`
  position: relative;
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
  position: relative;
  display: flex;
  width: 100%;
  height: fit-content;
`

interface PropType {
  data: LeagueBlockType
  selectMode: boolean
}

const LeagueFixtures = ({ data, selectMode }: PropType) => {
  const dispatch = useDispatch()
  const { blockData } = useSelector((state: IRootState) => state.post)
  const [selectedFixtureBoolean, setSelectedFixtureBoolean] = useState<boolean[]>(
    data.fixtures.map(() => false)
  ) // 개별 경기 선택 유무 리스트
  const [allSelected, setAllSelected] = useState<boolean>(false) // 전체 선택 유뮤
  const [selectedFixtureData, setSelectedFixtureData] = useState<FixtureBlockType[]>([]) // 선택한 경기 정보 리스트

  const [menuState, setMenuState] = useState<boolean>(true) // 메뉴 열림 상태

  // 선택한 경기 정보 리스트 바뀔 때마다 reducer blockData에 반영
  useEffect(() => {
    const newBlockData = blockData.data.map((x: LeagueBlockType) =>
      x.id === data.id
        ? {
            id: data.id,
            name: data.name,
            logo: data.logo,
            fixtures: selectedFixtureData,
          }
        : x
    )
    dispatch(setBlockData(newBlockData))
  }, [selectedFixtureData])

  useEffect(() => {
    // 선택한 경기 정보를 리스트에 반영
    setSelectedFixtureData(data.fixtures.filter((x, i) => selectedFixtureBoolean[i]))
    setAllSelected(selectedFixtureBoolean.findIndex((x) => x === true) !== -1)
    console.log(allSelected, selectedFixtureBoolean)
  }, [selectedFixtureBoolean, allSelected])

  const selectAll = useCallback(() => {
    setSelectedFixtureBoolean(data.fixtures.map(() => !allSelected))
    setAllSelected(!allSelected)
    // 선택한 경기 정보를 리스트에 반영
  }, [allSelected])

  const selectOne = useCallback(
    (index: number) => {
      setSelectedFixtureBoolean(
        selectedFixtureBoolean.map((b, i: number) =>
          i === index ? !selectedFixtureBoolean[i] : selectedFixtureBoolean[i]
        )
      )
    },
    [selectedFixtureBoolean]
  )

  const openMenu = useCallback(() => {
    if (!selectMode) {
      setMenuState(!menuState)
    }
  }, [menuState, selectMode])

  return (
    <React.Fragment>
      <FixturesContainer>
        <LeagueTitle onClick={openMenu}>
          <SelectBox selectMode={selectMode} allSelected={allSelected} onClick={selectAll} />
          <LeagueName>
            <Flag src={data.logo} />
            {data.name}
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
          ? data.fixtures.map((fixture, i) => (
              <FixtureContainer>
                <SelectBox
                  selectMode={selectMode}
                  allSelected={selectedFixtureBoolean[i]}
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
