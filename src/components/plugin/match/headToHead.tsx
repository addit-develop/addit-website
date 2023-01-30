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

interface PropsType {
  predictionData: MatchPredictionDataType | undefined
}

const HeadToHead = ({ predictionData }: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        <Styles.SubTitle>Head to Head</Styles.SubTitle>
        <SubContainer></SubContainer>
      </Container>
    </React.Fragment>
  )
}

export default HeadToHead
