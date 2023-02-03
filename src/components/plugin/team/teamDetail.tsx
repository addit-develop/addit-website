import useAxios from '@/hooks/useAxios'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { TeamType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import MenuBar from '../common/menuBar'
import TeamDetailTitle from './teamDetailTitle'
import TeamFixtures from './teamFixtures'
import TeamSquad from './teamSquad'
import TeamStats from './teamStats'
import TeamTable from './teamTable'
import TeamTransfer from './teamTransfer'

const Container = styled.div`
  width: 100%;
  overflow-y: scroll;
`

interface PropsType {
  teamId: number
  leagueId: number
  blockId: string
}

const TeamDetail = ({ teamId, leagueId, blockId }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const menu = ['Fixtures', 'Table', 'Squad', 'Stats', 'Transfer']

  const [team, setTeam] = useState<TeamType | null>(null)
  const [selectedMenu, setSelectedMenu] = useState<string>('Fixtures')

  const getTeamData = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/teams', { params: { id: teamId } })
    console.log(res)
    setTeam(res.data.response[0].team)
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getTeamData()
  }, [])

  if (!team) return null
  return (
    <React.Fragment>
      <Container>
        <TeamDetailTitle team={team} />
        <MenuBar menu={menu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        {selectedMenu === 'Fixtures' ? (
          <TeamFixtures team={team} />
        ) : selectedMenu === 'Table' ? (
          <TeamTable team={team} leagueId={leagueId} />
        ) : selectedMenu === 'Squad' ? (
          <TeamSquad team={team} />
        ) : selectedMenu === 'Stats' ? (
          <TeamStats team={team} />
        ) : (
          <TeamTransfer team={team} />
        )}
      </Container>
    </React.Fragment>
  )
}
export default TeamDetail
