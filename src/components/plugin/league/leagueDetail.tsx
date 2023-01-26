import useAxios from '@/hooks/useAxios'
import { CountryType, LeagueType } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import LeagueDetailTitle from './leagueDetailTitle'
import LeagueDetailBody from './leaugeDetailBody'

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
    console.log(res)
    setLeagueData(res.data.response[0])
  }

  useEffect(() => {
    getLeagueDetail()
  }, [])

  if (!leagueData) return null
  return (
    <React.Fragment>
      <LeagueDetailTitle league={leagueData.league} />
      <LeagueDetailBody league={leagueData.league} />
    </React.Fragment>
  )
}
export default LeagueDetail
