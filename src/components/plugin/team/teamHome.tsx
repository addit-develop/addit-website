import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { changeModalPage } from '@/store/actions/pageAction'
import { TeamType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import TeamDetailTitle from './teamDetailTitle'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.white};
  overflow-y: scroll;
`
const SearchAny = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface PropsType {
  // searchRef: any
}
const TeamHome = ({}: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  const [searchData, setSearchData] = useState<{ team: TeamType; venue: any }[]>([])

  const searchTeam = async (key: string) => {
    const res = await axios.get('/teams', { params: { search: key } })
    setSearchData(res.data.response)
  }

  useEffect(() => {
    searchTeam('manchester')
  }, [])

  return (
    <React.Fragment>
      <Container>
        {searchData.length === 0 ? (
          <SearchAny>Search any team</SearchAny>
        ) : (
          <>
            {searchData.map((t) => {
              return (
                <div
                  key={t.team.id}
                  onClick={() => dispatch(changeModalPage('teamDetail', 'Teams', t.team.id))}
                >
                  <TeamDetailTitle team={t.team} />
                </div>
              )
            })}
          </>
        )}
      </Container>
    </React.Fragment>
  )
}
export default TeamHome
