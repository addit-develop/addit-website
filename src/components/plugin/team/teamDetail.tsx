import useAxios from '@/hooks/useAxios'
import { TeamType } from '@/types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TeamInfoBox from './teamInfoBox'

const Container = styled.div`
  width: 100%;
`

interface PropsType {
  teamId: number
  blockId: string
}
const TeamDetail = ({ teamId, blockId }: PropsType) => {
  const axios = useAxios()
  const [team, setTeam] = useState<TeamType | null>(null)

  const getTeamData = async () => {
    const res = await axios.get('/teams', { params: { id: teamId } })
    console.log(res)
    setTeam(res.data.response[0].team)
  }

  useEffect(() => {
    getTeamData()
  }, [])

  if (!team) return null
  return (
    <React.Fragment>
      <Container>
        <TeamInfoBox team={team} />
      </Container>
    </React.Fragment>
  )
}
export default TeamDetail
