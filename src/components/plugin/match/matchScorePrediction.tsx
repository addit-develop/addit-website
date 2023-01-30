import * as Styles from './matchDetail-st'
import { default as React, useCallback, useState, useEffect } from 'react'
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

const PredictionScore = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: ${COLORS.darkgray};
  font-size: 28px;
  & span {
    width: 100%;
    font-size: 18px;
    text-align: center;
  }
  & div {
    flex-shrink: 0;
    width: 41px;
    text-align: center;
  }
  & #home {
    color: ${COLORS.red};
  }
  & #away {
    color: ${COLORS.blue};
  }
`

const PredictionPresentage = styled.div<{ data: { home: string; draw: string; away: string } }>`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 0 16px 16px;
  & div {
    text-align: center;
    line-height: 24px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }
  & #home {
    width: ${(props) => props.data?.home};
    background-color: ${COLORS.red};
    border-radius: 5px 0 0 5px;
  }
  & #draw {
    width: ${(props) => props.data?.draw};
    background-color: ${COLORS.darkgray};
  }
  & #away {
    width: ${(props) => props.data?.away};
    background-color: ${COLORS.blue};
    border-radius: 0 5px 5px 0;
  }
`

interface PropsType {
  predictionData: MatchPredictionDataType | undefined
}

const MatchScorePrediction = ({ predictionData }: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        <Styles.SubTitle>Prediction</Styles.SubTitle>
        <PredictionScore>
          <span>Home</span>
          <div id="home">{Math.abs(predictionData?.predictions.goals.home)}</div>
          <div>:</div>
          <div id="away">{Math.abs(predictionData?.predictions.goals.away)}</div>
          <span>Away</span>
        </PredictionScore>
        <PredictionPresentage data={predictionData?.predictions.percent}>
          <div id="home">{predictionData?.predictions.percent.home}</div>
          <div id="draw">{predictionData?.predictions.percent.draw}</div>
          <div id="away">{predictionData?.predictions.percent.away}</div>
        </PredictionPresentage>
      </Container>
    </React.Fragment>
  )
}

export default MatchScorePrediction
