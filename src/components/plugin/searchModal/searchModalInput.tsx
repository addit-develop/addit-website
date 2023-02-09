import { COLORS } from '@/constants/constants'
import { changeModalPage } from '@/store/actions/pageAction'
import { useState, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import majorLeagues from '@/data/majorLeaguesData.json'
import { LeagueType } from '@/types'
import LeagueDropDown from '../common/leagueDropDown'
import { CircleCrossIcon, SearchIcon } from '@/assets/icons'

export const SearchContainer = styled.div<{ display: boolean }>`
  order: 1;
  display: ${(props) => (props.display ? 'flex' : 'none')};
  flex-direction: row;
  width: 100%;
  height: 48px;
  background: ${COLORS.white};
  align-items: center;
  justify-content: start;
  padding: 0 8px;
  @media only screen and (max-width: 600px) {
    height: 48px;
    padding: 8px 16px 8px 8px;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  height: 24px;
  margin: 12px 0;
  line-height: 24px;
  font-size: 16px;
  &::placeholder {
    color: ${COLORS.gray};
  }
`

export const ClearButton = styled.button<{ display: boolean }>`
  display: ${(props) => (props.display ? 'flex' : 'none')};
  width: 20px;
  height: 20px;
`

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  margin-left: 8px;
`

interface PropsType {
  display: boolean
}

const SearchModalInput = ({ display }: PropsType) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>('')
  const [league, setLeague] = useState<LeagueType>(majorLeagues[0])
  const [clearBtnDisplay, setClearBtnDisplay] = useState<boolean>(false)

  // 검색어 기록, 검색창 클리어 버튼 활성화, 비활성화
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (e.target.value === '') {
      setClearBtnDisplay(false)
    } else {
      setClearBtnDisplay(true)
    }
  }, [])

  const clearInput = useCallback(() => {
    if (inputRef.current) inputRef.current.value = ''
    setClearBtnDisplay(false)
  }, [inputRef])

  const search = useCallback(() => {
    dispatch(changeModalPage('playerHome', 'Players', { leagueId: league.id, searchKey: value }))
  }, [value, league])

  // 검색창이 본문 작성 영역의 하위 요소이기 때문에 엔터를 클릭하면 본문 작성 영역으로 넘어가지는 문제가 발생. 이를 방지하기 위한 코드
  const stopEnterPropagation = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.stopPropagation()
  }, [])

  // 엔터키로 검색
  const enterSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') search()
    },
    [value]
  )

  return (
    <SearchContainer display={display}>
      <LeagueDropDown selectedLeague={league} setSelectedLeague={setLeague} />
      <SearchInput
        placeholder="Search players"
        ref={inputRef}
        onChange={(e) => onInputChange(e)}
        onKeyDown={(e) => stopEnterPropagation(e)}
        onKeyUp={(e) => enterSearch(e)}
      />
      <ClearButton display={clearBtnDisplay} onClick={clearInput}>
        <CircleCrossIcon width={16} height={16} fill={COLORS.darkgray} />
      </ClearButton>
      <SearchButton onClick={search}>
        <SearchIcon width={24} height={24} fill={COLORS.darkgray} />
      </SearchButton>
    </SearchContainer>
  )
}

export default SearchModalInput
