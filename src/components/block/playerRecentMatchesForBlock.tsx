import { ChevronRightIcon } from '@/assets/icons'
import { COLORS } from '@/constants/constants'
import { changeModalPage } from '@/store/actions/pageAction'
import { FixtureType, PlayerDataType } from '@/types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BoldTitleBox from '../plugin/common/boldTitleBox'
import FixtureTable from '../plugin/common/fixtureTable'

const Container = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 10px;
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px ${COLORS.lightgray} solid;
  background-color: ${COLORS.white};
`
const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  font-size: 14px;
`
const DateLabel = styled.div`
  color: ${COLORS.darkgray};
`
const LeagueLabel = styled.div``

const MoreButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  color: ${COLORS.darkgray};
  padding: 2px 0px 10px 0px;
  cursor: pointer;
`

const ViewLabel = styled.div`
  font-size: 14px;
  color: ${COLORS.darkgray};
  display: flex;
  padding: 10px 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

interface PropsType {
  data: FixtureType[]
  playerData: PlayerDataType
}

const PlayerRecentMatches = ({ data, playerData }: PropsType) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <React.Fragment>
      <Container>
        <BoldTitleBox>Recent Matches</BoldTitleBox>
        {data.slice(0, isOpen ? undefined : 3).map((f) => {
          return (
            <BoxContainer key={f.fixture.id}>
              <DateContainer>
                <DateLabel>{f.fixture.date.substring(0, 10)}</DateLabel>
                <LeagueLabel>{f.league.name}</LeagueLabel>
              </DateContainer>
              <FixtureTable key={f.fixture.id} fixture={f} />
              <MoreButton
                onClick={() =>
                  dispatch(
                    changeModalPage('playerMatchDetail', 'Players', {
                      playerData: playerData,
                      fixtureData: f,
                    })
                  )
                }
              >
                Player Stats
                <ChevronRightIcon width={20} height={20} fill={COLORS.darkgray} />
              </MoreButton>
            </BoxContainer>
          )
        })}
        {data.length > 3 ? (
          <ViewLabel onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'View Less' : 'View More'}
          </ViewLabel>
        ) : null}
      </Container>
    </React.Fragment>
  )
}

export default PlayerRecentMatches
