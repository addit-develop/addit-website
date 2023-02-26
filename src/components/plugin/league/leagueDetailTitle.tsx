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
const LeagueImage = styled.img`
  width: 40px;
  height: 40px;
  @media only screen and (max-width: 400px) {
    width: 36px;
    height: 36px;
  }
`

const LeagueTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
  @media only screen and (max-width: 400px) {
    font-size: 18px;
  }
`

const Season = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 16px;
  font-family: 'Manrope';
  font-weight: 600;
  color: ${COLORS.lightblack};
  @media only screen and (max-width: 400px) {
    font-size: 14px;
  }
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
        <LeagueImage src={league.logo} alt={league.name} />
        <LeagueTitle>{league.name}</LeagueTitle>
        {season &&
          (seasonList && setSeason ? (
            <SeasonDropDown
              season={season}
              seasonList={seasonList.map((s) => s.year).reverse()}
              setSeason={setSeason}
            />
          ) : (
            <Season>
              {season}-{season + 1}
            </Season>
          ))}
      </Container>
    </React.Fragment>
  )
}
export default LeagueDetailTitle
