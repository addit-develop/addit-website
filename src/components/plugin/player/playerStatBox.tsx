import { COLORS } from '@/constants/constants'
import useAxios from '@/hooks/useAxios'
import { useCountryFlag } from '@/hooks/useCountryFlag'
import { PlayerDataType, PlayerType, StatisticsType, TeamType } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CircledImage from '../common/circledImage'

const Container = styled.div`
  width: 100%;
  padding: 8px 0px;
  background-color: ${COLORS.white};
  border-radius: 10px;
`
const Row = styled.div`
  flex-direction: row;
  display: flex;
  gap: 20px;
  align-items: center;
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
const NumberRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-right: ;
`

interface PropsType {
  playerData: PlayerDataType
}

const PlayerStatBox = ({ playerData }: PropsType) => {
  const axios = useAxios()
  const [playerNumber, setPlayerNumber] = useState<
    { teamName: string; teamLogo: string; number: number }[]
  >([])

  const getPlayerNumber = async () => {
    const res = await axios.get('/players/squads', { params: { player: playerData.player.id } })
    const temp = res.data.response.map((r) => {
      return {
        teamName: r.team.name,
        teamLogo: r.team.logo,
        number: r.players[0].number,
      }
    })
    setPlayerNumber(temp)
  }

  useEffect(() => {
    getPlayerNumber()
  }, [])

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
            <Row>
              {playerNumber.map((item) => {
                return (
                  <NumberRow key={item.teamName}>
                    <CircledImage
                      src={item.teamLogo}
                      width={24}
                      height={24}
                      altText={item.teamName}
                    />
                    <StatNumber>{item.number}</StatNumber>
                  </NumberRow>
                )
              })}
            </Row>
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
