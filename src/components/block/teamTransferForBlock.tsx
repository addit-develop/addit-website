import { COLORS } from '@/constants/constants'
import { TeamStatisticType, TransferType } from '@/types'
import React from 'react'
import styled from 'styled-components'
import BoldTitleBox from '../plugin/common/boldTitleBox'
import CircledImage from '../plugin/common/circledImage'

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
  data: {
    in: boolean
    out: boolean
    transferData: TransferType[]
  }
  team: TeamStatisticType
}

const TeamTransfer = ({ data, team }: PropsType) => {
  return (
    <React.Fragment>
      {data.in && (
        <Container>
          <BoldTitleBox>Player In</BoldTitleBox>
          {data.transferData
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
      )}
      {data.out && (
        <Container>
          <BoldTitleBox>Player Out</BoldTitleBox>
          {data.transferData
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
      )}
    </React.Fragment>
  )
}

export default TeamTransfer
