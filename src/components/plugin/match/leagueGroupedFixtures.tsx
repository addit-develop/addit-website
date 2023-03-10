import { default as React, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { FixtureListBlockType, BlockDataType, FixtureType } from '@/types'
import FixtureTable from '../common/fixtureTable'
import { useDispatch, useSelector } from 'react-redux'
import rootReducer, { RootState } from '@/store/reducers'
import { setBlockData } from '@/store/actions/postAction'
import SelectBox from '../common/selectBox'
import { ChevronDownIcon, ChevronUpIcon } from '@/assets/icons'

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

interface PropsType {
  fixtures: FixtureType[]
  forBlock?: boolean
  blockId?: string
}

const LeagueGroupedFixtures = ({ fixtures, forBlock = false, blockId }: PropsType) => {
  const league = fixtures && fixtures[0].league
  const dispatch = useDispatch()
  const { selectMode } = useSelector((state: RootState) => state.pageReducer)
  const { blockDataList } = useSelector((state: RootState) => state.postReducer)
  const [selectedFixtureBoolean, setSelectedFixtureBoolean] = useState<boolean[]>(
    fixtures.map(() => false)
  ) // 개별 경기 선택 유무 리스트
  const [allSelected, setAllSelected] = useState<boolean>(false) // 전체 선택 유뮤
  const [selectedFixtureData, setSelectedFixtureData] = useState<FixtureType[]>([]) // 선택한 경기 정보 리스트
  const [menuState, setMenuState] = useState<boolean>(true) // 메뉴 열림 상태

  // 선택한 경기 정보 리스트 바뀔 때마다 reducer blockData에 반영
  useEffect(() => {
    const myBlockData = blockDataList.find((x: BlockDataType) => x.id === blockId)
    const newBlockData =
      myBlockData?.type === 'Fixture_List_By_Date' &&
      myBlockData.data.map((x: FixtureListBlockType) =>
        x.id === league.id
          ? {
              id: league.id,
              name: league.name,
              logo: league.logo,
              fixtures: selectedFixtureData,
            }
          : x
      )
    if (blockId && !myBlockData?.isReady) dispatch(setBlockData(blockId, newBlockData))
  }, [selectedFixtureData])

  useEffect(() => {
    // 선택한 경기 정보를 리스트에 반영
    setSelectedFixtureData(
      fixtures.filter((x: FixtureType, i: number) => selectedFixtureBoolean[i])
    )
    setAllSelected(selectedFixtureBoolean.findIndex((x) => x === true) !== -1)
    // console.log(allSelected, selectedFixtureBoolean)
  }, [selectedFixtureBoolean, allSelected])

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
        <LeagueTitle onClick={openMenu}>
          <SelectBox selectMode={selectMode} selected={allSelected} onClick={selectAll} />
          <LeagueName>
            <Flag src={league.logo} />
            {league.name}
          </LeagueName>
          {menuState ? (
            <ChevronDownIcon height="24" width="24" fill={COLORS.darkgray} />
          ) : (
            <ChevronUpIcon height="24" width="24" fill={COLORS.darkgray} />
          )}
        </LeagueTitle>
        {menuState
          ? fixtures.map((fixture, i) => (
              <FixtureContainer key={i}>
                <SelectBox
                  selectMode={selectMode}
                  selected={selectedFixtureBoolean[i]}
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

export default LeagueGroupedFixtures
