import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { countryType, leagueType } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MajorLeagues from '@/data/majorLeaguesData.json'

const Container = styled.div`
  width: 100%;
  gap: 10px;
  overflow-y: scroll;
`
const Title = styled.div`
  width: 100%;
  padding: 18px 10px;
  font-size: 20px;
  font-weight: bold;
  background-color: ${COLORS.white};
  margin-bottom: 1px;
`
const LeagueList = styled.div`
  padding: 8px 10px;
  background-color: ${COLORS.white};
  gap: 0px;
`
const LeagueBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 18px 0px;
`
const LeagueName = styled.div`
  font-size: 16px;
  font-weight: 'medium';
`

const LeagueHome = () => {
  const axios = useAxios()
  const [leagueList, setLeagueList] = useState<leagueDataType[]>([])

  type leagueDataType = {
    league: leagueType
    country: countryType
    seasons: any
  }

  const getLeagueData = async () => {
    const response = await axios.get('/leagues', { params: { season: 2023, current: true } })
    console.log(response)
    setLeagueList(response.data.response)
  }

  useEffect(() => {
    // getLeagueData()
  }, [])

  return (
    <React.Fragment>
      <Container>
        <Title>All Leagues</Title>
        <LeagueList>
          {MajorLeagues.map((league, i) => {
            return (
              <LeagueBox key={i}>
                <Image src={league.logo} height="28" width="28" alt={league.name} />
                <LeagueName>{league.name}</LeagueName>
              </LeagueBox>
            )
          })}
        </LeagueList>
      </Container>
    </React.Fragment>
  )
}

export default LeagueHome
