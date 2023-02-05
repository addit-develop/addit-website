import { LeagueType, SeasonType } from '@/types'
import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import SeasonDropDown from '../common/seasonDropDown'

const Container = styled.div`
  background-color: ${COLORS.white};
  width: 100%;
  height: 60px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LeagueTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
`

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
  /* margin-right: 20px; */
  font-family: 'Manrope';
  font-weight: 600;
  color: ${COLORS.lightblack};
`

const SeasonSelector = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.white};
  gap: 15px;
  padding: 10px 20px;
  top: 30px;
  right: 0px;
  border-radius: 14px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const SeasonItem = styled.div`
  white-space: nowrap;
  cursor: pointer;
  font-family: 'Manrope';
  font-weight: 600;
  color: ${COLORS.lightblack};
`

interface PropsType {
  league: LeagueType
  seasonList?: SeasonType[]
  season?: number
  setSeason?: (season: number) => void
}

const LeagueDetailTitle = ({ league, seasonList, season, setSeason }: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        <Image src={league.logo} height={40} width={40} alt={league.name} />
        <LeagueTitle>{league.name}</LeagueTitle>
        {season && seasonList && setSeason && (
          <SeasonDropDown
            season={season}
            seasonList={seasonList.map((s) => s.year)}
            setSeason={setSeason}
          />
        )}
      </Container>
    </React.Fragment>
  )
}
export default LeagueDetailTitle
