import { COLORS } from '@/constants/constants'
import { LeagueType } from '@/types'
import React, { useState } from 'react'
import styled from 'styled-components'
import CircledImage from './circledImage'
import majorLeagues from '@/data/majorLeaguesData.json'
import { ChevronDownIcon, ChevronUpIcon } from '@/assets/icons'

const SeasonContainer = styled.div`
  margin-left: auto;
  font-size: 16px;
  color: ${COLORS.darkgray};
  position: relative;
  cursor: pointer;
`

const Season = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Manrope';
  font-weight: 600;
  color: ${COLORS.lightblack};
`

const SeasonSelector = styled.div`
  height: 300px;
  overflow-y: scroll;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.white};
  gap: 15px;
  padding: 5px 10px;
  top: 30px;
  right: 6px;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 1;
  /* &::-webkit-scrollbar {
    display: none;  
  } */
`

const SeasonItem = styled.div`
  white-space: nowrap;
  cursor: pointer;
  font-family: 'Manrope';
  font-weight: 600;
  color: ${COLORS.lightblack};
`

interface PropsType {
  selectedLeague: LeagueType
  setSelectedLeague: (menu: LeagueType) => void
}

const LeagueDropDown = ({ selectedLeague, setSelectedLeague }: PropsType) => {
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
  return (
    <React.Fragment>
      <SeasonContainer onClick={() => setDropDownOpen(!dropDownOpen)}>
        <Season>
          <CircledImage
            src={selectedLeague.logo}
            width={20}
            height={20}
            altText={selectedLeague.name}
          />
          {dropDownOpen ? (
            <ChevronDownIcon width={24} height={24} fill={COLORS.darkgray} />
          ) : (
            <ChevronUpIcon width={24} height={24} fill={COLORS.darkgray} />
          )}
        </Season>
        {majorLeagues && dropDownOpen && (
          <SeasonSelector>
            {majorLeagues.map((s) => {
              return (
                <SeasonItem
                  key={s.name}
                  onClick={() => {
                    setSelectedLeague(s)
                    setDropDownOpen(false)
                  }}
                >
                  <CircledImage src={s.logo} width={20} height={20} altText={s.name} />
                </SeasonItem>
              )
            })}
          </SeasonSelector>
        )}
      </SeasonContainer>
    </React.Fragment>
  )
}

export default LeagueDropDown
