import useAxios from '@/hooks/useAxios'
import { CountryType, LeagueType } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import LeagueDetailTitle from './leagueDetailTitle'
import LeagueDetailBody from './leagueDetailBody'
import styled from 'styled-components'

const Container = styled.div`
  overflow-y: scroll;
  width: 100%;
`
interface PropsType {
  leagueId: number
  blockId: string
}

type LeagueDataType = {
  league: LeagueType
  country: CountryType
  seasons: any[]
}

const LeagueDetail = ({ leagueId, blockId }: PropsType) => {
  const [leagueData, setLeagueData] = useState<LeagueDataType>()
  const axios = useAxios()

  const getLeagueDetail = async () => {
    const res = await axios.get('/leagues', { params: { id: leagueId } })
    setLeagueData(res.data.response[0])
  }

  useEffect(() => {
    getLeagueDetail()
  }, [])

  if (!leagueData) return null
  return (
    <React.Fragment>
      <Container>
        <LeagueDetailTitle league={leagueData.league} />
        <LeagueDetailBody league={leagueData.league} />
      </Container>
    </React.Fragment>
  )
}
export default LeagueDetail
