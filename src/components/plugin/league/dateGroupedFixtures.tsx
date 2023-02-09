import { default as React, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import { FixtureType } from '@/types'
import FixtureTable from '../common/fixtureTable'
import { useDispatch, useSelector } from 'react-redux'
import rootReducer, { RootState } from '@/store/reducers'
import { setBlockData } from '@/store/actions/postAction'
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

interface PropsType {
  fixtures: FixtureType[]
  forBlock?: boolean
}

const DateGroupedFixtures = ({ fixtures, forBlock = false }: PropsType) => {
  const date = fixtures[0].fixture.date
  const [menuState, setMenuState] = useState<boolean>(true) // 메뉴 열림 상태

  const openMenu = useCallback(() => {
    setMenuState(!menuState)
  }, [menuState])

  return (
    <React.Fragment>
      <FixturesContainer forBlock={forBlock}>
        <Date onClick={openMenu}>
          <LeagueName>{date.substring(0, 10)}</LeagueName>
          {forBlock ? null : menuState ? (
            <ChevronDownIcon height="24" width="24" fill={COLORS.darkgray} />
          ) : (
            <ChevronUpIcon height="24" width="24" fill={COLORS.darkgray} />
          )}
        </Date>
        {menuState
          ? fixtures.map((fixture, i) => <FixtureTable key={i} fixture={fixture} />)
          : null}
      </FixturesContainer>
    </React.Fragment>
  )
}

export default DateGroupedFixtures
