import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { CountryType, LeagueType } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MajorLeagues from '@/data/majorLeaguesData.json'
import { changeModalPage, loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { useDispatch } from 'react-redux'

const Container = styled.div`
  width: 100%;
  height: 100%;
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
  border-radius: 10px;
`
const LeagueBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 18px 0px;
  cursor: pointer;
`
const LeagueName = styled.div`
  font-size: 16px;
  font-weight: 'medium';
`

type leagueDataType = {
  league: LeagueType
  country: CountryType
  seasons: any
}

const LeagueHome = () => {
  const axios = useAxios()
  const dispatch = useDispatch()
  const [leagueList, setLeagueList] = useState<leagueDataType[]>([])

  const getLeagueData = async () => {
    dispatch(loadDataStart())
    const response = await axios.get('/leagues', { params: { season: 2023, current: true } })
    console.log(response)
    setLeagueList(response.data.response)
    dispatch(loadDataFinish())
  }

  const navigateLeagueDetail = (leagueId: number) => {
    dispatch(changeModalPage('leagueDetail', 'Leagues', leagueId))
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
              <LeagueBox
                key={i}
                onClick={() => {
                  dispatch(changeModalPage('leagueDetail', 'Leagues', league.id))
                }}
              >
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
