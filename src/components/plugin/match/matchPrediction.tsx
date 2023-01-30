import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { MatchPredictionDataType } from '@/types'
import MatchHeader from './matchHeader'
import MatchScorePrediction from './matchScorePrediction'
import TeamForm from './teamForm'
import { FixtureType } from '@/types'

interface PropsType {
  fixtureData: FixtureType | undefined
  selectMode: boolean
  blockId: string
}

const MatchPrediction = ({ fixtureData, selectMode, blockId }: PropsType) => {
  const [predictionData, setPredictionData] = useState<MatchPredictionDataType>()

  const axios = useAxios()
  const getPredictionData = useCallback(async () => {
    const response = await axios
      .get('/predictions', { params: { fixture: fixtureData?.fixture.id } })
      .then((response) => {
        console.log(response)
        setPredictionData(response.data.response[0])
      })
      .catch((error) => {
        console.error(error)
      })
  }, [fixtureData])

  useEffect(() => {
    getPredictionData()
  }, [])

  if (fixtureData === undefined) {
    return (
      <React.Fragment>
        <Styles.Container>잘못된 접근입니다.</Styles.Container>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Styles.Container>
        <MatchHeader matchData={fixtureData} />
        <MatchScorePrediction predictionData={predictionData} />
        <TeamForm predictionData={predictionData} />
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchPrediction
