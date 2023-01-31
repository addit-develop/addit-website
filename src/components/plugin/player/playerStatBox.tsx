import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { useCountryFlag } from '@/hooks/useCountryFlag'
import { PlayerDataType, PlayerType, StatisticsType, TeamType } from '@/types'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 8px 0px;
  background-color: ${COLORS.white};
  border-radius: 10px;
`
const Row = styled.div`
  flex-direction: row;
  display: flex;
  gap: 8px;
`

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 84px;
  flex: 1;
`

const StatName = styled.div`
  font-size: 14px;
  color: ${COLORS.darkgray};
`
const StatNumber = styled.div`
  font-size: 18px;
  color: ${COLORS.black};
`

interface PropsType {
  playerData: PlayerDataType
  playerNumber: number
}

const PlayerStatBox = ({ playerData, playerNumber }: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <StatBox>
            <StatName>Age</StatName>
            <StatNumber>{playerData.player.age}</StatNumber>
          </StatBox>
          <StatBox>
            <StatName>Height</StatName>
            <StatNumber>{playerData.player.height}</StatNumber>
          </StatBox>
          <StatBox>
            <StatName>Weight</StatName>
            <StatNumber>{playerData.player.weight}</StatNumber>
          </StatBox>
        </Row>
        <Row>
          <StatBox>
            <StatName>Shirt</StatName>
            <StatNumber>{playerNumber}</StatNumber>
          </StatBox>
          <StatBox>
            <StatName>Injured</StatName>
            <StatNumber>{playerData.player.injured ? 'O' : '-'}</StatNumber>
          </StatBox>
        </Row>
      </Container>
    </React.Fragment>
  )
}
export default PlayerStatBox
