import { default as React, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { LeagueBlockType, BlockDataType, FixtureType } from '@/types'
import FixtureTable from '../common/fixtureTable'
import { useDispatch, useSelector } from 'react-redux'
import rootReducer, { RootState } from '@/store/reducers'
import { setBlockData } from '@/store/actions/postAction'

const FixturesContainer = styled.div<{ forBlock?: boolean }>`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  border-bottom: ${(props) => (props.forBlock ? '1px solid ${COLORS.gray}' : 'none')};
`

const SelectBox = styled.div<{ selectMode?: boolean; allSelected?: boolean }>`
  display: ${(props) => (props.selectMode ? 'flex' : 'none')};
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.allSelected ? 'transperant' : 'rgba(255, 255, 255, 0.8)')};
`

const Date = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const LeagueName = styled.div`
  font-size: 15px;
  display: flex;
  color: ${COLORS.black};
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

interface PropsType {
  fixtures: FixtureType[]
  selectMode: boolean
  forBlock?: boolean
  blockId?: string
}

const DateGroupedFixtures = ({ fixtures, selectMode, forBlock = false, blockId }: PropsType) => {
  const date = fixtures[0].fixture.date
  const dispatch = useDispatch()
  const { blockDataList } = useSelector((state: RootState) => state.postReducer)
  const [selectedFixtureBoolean, setSelectedFixtureBoolean] = useState<boolean[]>(
    fixtures.map(() => false)
  ) // 개별 경기 선택 유무 리스트
  const [allSelected, setAllSelected] = useState<boolean>(false) // 전체 선택 유뮤
  const [selectedFixtureData, setSelectedFixtureData] = useState<FixtureType[]>([]) // 선택한 경기 정보 리스트
  const [menuState, setMenuState] = useState<boolean>(true) // 메뉴 열림 상태

  // 선택한 경기 정보 리스트 바뀔 때마다 reducer blockData에 반영
  // useEffect(() => {
  //   const myBlockData = blockDataList.find((x: BlockDataType) => x.id === blockId)
  //   const newBlockData =
  //     myBlockData &&
  //     myBlockData.data.map((x: LeagueBlockType) =>
  //       x.id === league.id
  //         ? {
  //             id: league.id,
  //             name: league.name,
  //             logo: league.logo,
  //             fixtures: selectedFixtureData,
  //           }
  //         : x
  //     )
  //   if (blockId && !myBlockData?.isReady) dispatch(setBlockData(blockId, newBlockData))
  // }, [selectedFixtureData])

  // useEffect(() => {
  //   // 선택한 경기 정보를 리스트에 반영
  //   setSelectedFixtureData(
  //     fixtures.filter((x: FixtureType, i: number) => selectedFixtureBoolean[i])
  //   )
  //   setAllSelected(selectedFixtureBoolean.findIndex((x) => x === true) !== -1)
  //   // console.log(allSelected, selectedFixtureBoolean)
  // }, [selectedFixtureBoolean, allSelected])

  const selectAll = useCallback(() => {
    setSelectedFixtureBoolean(fixtures.map(() => !allSelected))
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
      <FixturesContainer forBlock={forBlock}>
        <Date onClick={openMenu}>
          <SelectBox selectMode={selectMode} allSelected={allSelected} onClick={selectAll} />
          <LeagueName>{date.substring(0, 10)}</LeagueName>
          {forBlock ? null : menuState ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z" fill={COLORS.darkgray} />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" fill={COLORS.darkgray} />
            </svg>
          )}
        </Date>
        {menuState
          ? fixtures.map((fixture, i) => (
              <FixtureContainer key={i}>
                <SelectBox
                  selectMode={selectMode}
                  allSelected={selectedFixtureBoolean[i]}
                  onClick={() => selectOne(i)}
                />
                <FixtureTable fixture={fixture} />
              </FixtureContainer>
            ))
          : null}
      </FixturesContainer>
    </React.Fragment>
  )
}

export default DateGroupedFixtures
