import { default as React } from 'react'
import { MatchPredictionDataType } from '@/types'
import MatchHeader from '../plugin/match/matchHeader'
import MatchScorePrediction from '../plugin/match/matchScorePrediction'
import TeamForm from '../plugin/match/teamForm'
import { FixtureType } from '@/types'
import HeadToHead from '../plugin/match/headToHead'
import { COLORS } from '@/constants/constants'
import styled from 'styled-components'

interface PropsType {
  data: {
    scorePrediction: boolean
    teamForm: boolean
    headToHead: boolean
    fixtureData: FixtureType | undefined
    predictionData: MatchPredictionDataType | undefined
  }
}

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: scroll;
  background-color: ${COLORS.lightgray};
  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 10px;
  box-shadow: 0px 0.6px 1.8px -0.63px rgba(0, 0, 0, 0.05),
    0px 1.8px 5.4px -1.3px rgba(0, 0, 0, 0.05), 0px 4.8px 14.3px -1.9px rgba(0, 0, 0, 0.05),
    0px 15px 45px -2.5px rgba(0, 0, 0, 0.05);
`

const MatchPredictionBlock = ({ data }: PropsType) => {
  return (
    <React.Fragment>
      <BlockContainer>
        <MatchHeader matchData={data.fixtureData} />
        <MatchScorePrediction predictionData={data.predictionData} />
        <TeamForm predictionData={data.predictionData} />
        <HeadToHead predictionData={data.predictionData} />
      </BlockContainer>
    </React.Fragment>
  )
}

export default MatchPredictionBlock
