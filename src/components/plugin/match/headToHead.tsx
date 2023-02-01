import * as Styles from './matchDetail-st'
import { default as React, useState, useEffect } from 'react'
import { MatchPredictionDataType } from '@/types'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'
import FixtureTable from '../common/fixtureTable'

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${COLORS.white};
  border-radius: 10px;
`

const SubContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 16px 8px;
`

const ResultConatiner = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  & div {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    color: #fff;
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    line-height: 50px;
  }
  & #home {
    background-color: ${COLORS.red};
  }
  & #draw {
    background-color: ${COLORS.darkgray};
  }
  & #away {
    background-color: ${COLORS.blue};
  }
`

const FixturesContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 8px;
`

interface PropsType {
  predictionData: MatchPredictionDataType | undefined
}

const HeadToHead = ({ predictionData }: PropsType) => {
  const [resultCount, setResultCount] = useState<{ home: number; draw: number; away: number }>({
    home: 0,
    draw: 0,
    away: 0,
  })

  useEffect(() => {
    predictionData?.h2h.forEach((x) => {
      if (x.teams.home.winner) setResultCount({ ...resultCount, home: resultCount.home + 1 })
      else if (x.teams.away.winner) setResultCount({ ...resultCount, away: resultCount.away + 1 })
      else setResultCount({ ...resultCount, draw: resultCount.draw + 1 })
    })
    console.log(resultCount)
  }, [predictionData])

  return (
    <React.Fragment>
      <Container>
        <Styles.SubTitle>Head to Head</Styles.SubTitle>
        <SubContainer>
          <ResultConatiner>
            <div id="home">{resultCount.home}</div>
            {predictionData?.teams.home.name}
          </ResultConatiner>
          <ResultConatiner>
            <div id="draw">{resultCount.draw}</div>
            draw
          </ResultConatiner>
          <ResultConatiner>
            <div id="away">{resultCount.away}</div>
            {predictionData?.teams.away.name}
          </ResultConatiner>
        </SubContainer>
        <FixturesContainer>
          {predictionData?.h2h.map((x) => (
            <FixtureTable fixture={x} />
          ))}
        </FixturesContainer>
      </Container>
    </React.Fragment>
  )
}

export default HeadToHead
