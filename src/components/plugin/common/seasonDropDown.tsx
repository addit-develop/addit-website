import { ChevronDownIcon, ChevronUpIcon } from '@/assets/icons'
import { COLORS } from '@/constants/constants'
import { SeasonType } from '@/types'
import { useState } from 'react'
import styled from 'styled-components'

const SeasonContainer = styled.div`
  z-index: 9;
  margin-left: auto;
  font-size: 16px;
  color: ${COLORS.darkgray};
  position: relative;
  cursor: pointer;
`

const Season = styled.div`
  display: flex;
  align-items: center;
  /* margin-right: 20px; */
  font-family: 'Manrope';
  font-weight: 600;
  color: ${COLORS.lightblack};
`

const SeasonSelector = styled.div<{ shorten?: boolean }>`
  position: absolute;
  height: ${(props) => (props.shorten ? '150px' : 'fit-conent')};
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.white};
  gap: 15px;
  padding: 10px 20px;
  top: 30px;
  right: 0px;
  border-radius: 14px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: scroll;
`

const SeasonItem = styled.div`
  white-space: nowrap;
  cursor: pointer;
  font-family: 'Manrope';
  font-weight: 600;
  color: ${COLORS.lightblack};
`

interface PropsType {
  seasonList: number[]
  season: number
  setSeason: ((season: number) => void) | undefined
  shorten?: boolean
}

const SeasonDropDown = ({ seasonList, season, setSeason, shorten }: PropsType) => {
  const [selectorOpen, setSelectorOpen] = useState<boolean>(false)

  return (
    <SeasonContainer onClick={() => setSelectorOpen(!selectorOpen)}>
      <Season>
        {season}-{season + 1}
        {setSeason ? (
          selectorOpen ? (
            <ChevronDownIcon height="24" width="24" fill={COLORS.darkgray} />
          ) : (
            <ChevronUpIcon height="24" width="24" fill={COLORS.darkgray} />
          )
        ) : null}
      </Season>
      {seasonList && setSeason && selectorOpen && (
        <SeasonSelector shorten={shorten}>
          {seasonList.map((s) => {
            return (
              <SeasonItem
                key={s}
                onClick={() => {
                  setSeason(s)
                  setSelectorOpen(false)
                }}
              >
                {s} - {s + 1}
              </SeasonItem>
            )
          })}
        </SeasonSelector>
      )}
    </SeasonContainer>
  )
}

export default SeasonDropDown
