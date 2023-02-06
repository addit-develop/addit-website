import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'
import { TeamStatisticType, TeamType, TransferType } from '@/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BoldTitleBox from '../common/boldTitleBox'
import CircledImage from '../common/circledImage'

const Container = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 14px;
`
const GrayLabel = styled.div`
  color: ${COLORS.darkgray};
`
const BlackLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

interface PropsType {
  team: TeamStatisticType
}

const TeamTransfer = ({ team }: PropsType) => {
  const dispatch = useDispatch()
  const axios = useAxios()
  // const { currentSeason } = useCurrentSeason()
  const [transfers, setTransfers] = useState<TransferType[]>([])

  const getTransfersData = async () => {
    dispatch(loadDataStart())
    const res = await axios.get('/transfers', {
      params: {
        team: team.team.id,
      },
    })
    let temp: TransferType[] = res.data.response
    temp = temp
      .filter((t) => t.transfers[0].date.length === 10)
      .sort((a, b) => (a.transfers[0].date > b.transfers[0].date ? -1 : 1))
    setTransfers(temp)
    dispatch(loadDataFinish())
  }

  useEffect(() => {
    getTransfersData()
  }, [team])

  return (
    <React.Fragment>
      <Container>
        <BoldTitleBox>Player In</BoldTitleBox>
        {transfers
          .filter((t) => t.transfers[0].teams.in.id === team.team.id)
          .slice(0, 5)
          .map((t, i) => {
            return (
              <div key={i}>
                <Row>
                  <GrayLabel>{t.transfers[0].date.substring(0, 10)}</GrayLabel>
                  <BlackLabel>
                    from
                    <CircledImage src={t.transfers[0].teams.out.logo} width={20} height={20} />
                    {t.transfers[0].teams.out.name}
                  </BlackLabel>
                </Row>
                <Row>
                  <BlackLabel>{t.player.name}</BlackLabel>
                  <BlackLabel>{t.transfers[0].type}</BlackLabel>
                </Row>
              </div>
            )
          })}
      </Container>
      <Container>
        <BoldTitleBox>Player Out</BoldTitleBox>
        {transfers
          .filter((t) => t.transfers[0].teams.out.id === team.team.id)
          .slice(0, 5)
          .map((t, i) => {
            return (
              <div key={i}>
                <Row>
                  <GrayLabel>{t.transfers[0].date.substring(0, 10)}</GrayLabel>
                  <BlackLabel>
                    to{' '}
                    <span>
                      <CircledImage src={t.transfers[0].teams.in.logo} width={20} height={20} />
                    </span>
                    {t.transfers[0].teams.in.name}
                  </BlackLabel>
                </Row>
                <Row>
                  <BlackLabel>{t.player.name}</BlackLabel>
                  <BlackLabel>{t.transfers[0].type}</BlackLabel>
                </Row>
              </div>
            )
          })}
      </Container>
    </React.Fragment>
  )
}

export default TeamTransfer
