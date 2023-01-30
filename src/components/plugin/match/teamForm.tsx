import * as Styles from './matchDetail-st'
import { default as React, useCallback } from 'react'
import { MatchPredictionDataType } from '@/types'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'

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
  height: 91px;
  display: flex;
`

const TeamContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  align-items: center;
  justify-content: center;
`

const ResultContainer = styled.div`
  width: fit-content;
  height: 24px;
  display: flex;
  gap: 4px;
  & div {
    width: 24px;
    height: 24px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    line-height: 24px;
  }
  & #win {
    background-color: #449765;
  }
  & #draw {
    background-color: ${COLORS.darkgray};
  }
  & #def {
    background-color: ${COLORS.red};
  }
`

interface PropsType {
  predictionData: MatchPredictionDataType | undefined
}

const TeamForm = ({ predictionData }: PropsType) => {
  const makeResultElements = useCallback((data: string) => {
    return data
      ?.substr(-5)
      .split('')
      .map((x: string) => {
        if (x === 'W') return <div id="win">W</div>
        else if (x === 'D') return <div id="draw">D</div>
        else if (x === 'L') return <div id="def">L</div>
      })
  }, [])

  return (
    <React.Fragment>
      <Container>
        <Styles.SubTitle>Team form {predictionData?.league.name}</Styles.SubTitle>
        <SubContainer>
          <TeamContainer>
            {predictionData?.teams.home.name}
            <ResultContainer>
              {makeResultElements(predictionData?.teams.home.league.form)}
            </ResultContainer>
          </TeamContainer>
          <TeamContainer>
            {predictionData?.teams.away.name}
            <ResultContainer>
              {makeResultElements(predictionData?.teams.away.league.form)}
            </ResultContainer>
          </TeamContainer>
        </SubContainer>
      </Container>
    </React.Fragment>
  )
}

export default TeamForm
