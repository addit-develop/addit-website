import { COLORS } from '@/constants/constants'
import { changeModalPage } from '@/store/actions/pageAction'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import majorLeagues from '@/data/majorLeaguesData.json'
import { LeagueType } from '@/types'
import DropDownMenu from '../common/dropDownMenu'

export const SearchContainer = styled.div<{ display: boolean }>`
  order: 1;
  display: ${(props) => (props.display ? 'flex' : 'none')};
  flex-direction: row;
  width: 100%;
  height: 48px;
  background: ${COLORS.white};
  align-items: center;
  justify-content: start;
  padding-right: 8px;
  @media only screen and (max-width: 600px) {
    order: 5;
    height: 48px;
    padding: 8px 16px;
  }
`

export const SearchInput = styled.input`
  border-radius: 10px 0 0 0;
  width: 100%;
  height: 24px;
  margin: 12px 0;
  line-height: 24px;
  font-size: 16px;
  &::placeholder {
    color: ${COLORS.gray};
  }
`

export const ClearButton = styled.button`
  display: none;
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
  const [value, setValue] = useState<string>('')
  const [league, setLeague] = useState<LeagueType>(majorLeagues[0])
  return (
    <SearchContainer display={display}>
      <DropDownMenu selectedLeague={league} setSelectedLeague={setLeague} />
      <SearchInput placeholder="Search players" onChange={(e) => setValue(e.target.value)} />
      <ClearButton>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path
            d="M5.648 11.2 8 8.847l2.352 2.351.847-.847L8.848 8l2.351-2.352-.847-.847L8 7.152 5.648 4.801l-.847.847L7.152 8l-2.351 2.352ZM8 14.397a6.192 6.192 0 0 1-2.484-.5 6.366 6.366 0 0 1-2.04-1.375 6.366 6.366 0 0 1-1.374-2.039A6.192 6.192 0 0 1 1.602 8c0-.89.164-1.719.5-2.492.332-.774.789-1.45 1.375-2.031a6.366 6.366 0 0 1 2.039-1.375A6.192 6.192 0 0 1 8 1.602c.89 0 1.719.164 2.492.5.774.332 1.45.789 2.031 1.375a6.375 6.375 0 0 1 1.375 2.03c.336.774.5 1.602.5 2.493 0 .879-.164 1.707-.5 2.484a6.366 6.366 0 0 1-1.375 2.04 6.375 6.375 0 0 1-2.03 1.374c-.774.336-1.602.5-2.493.5Zm0 0"
            fill="#8a8a8a"
          />
        </svg>
      </ClearButton>
      <SearchButton
        onClick={() => {
          dispatch(
            changeModalPage('playerHome', 'Players', { leagueId: league.id, searchKey: value })
          )
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path
            d="m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"
            fill="#8a8a8a"
          />
        </svg>
      </SearchButton>
    </SearchContainer>
  )
}

export default SearchModalInput
