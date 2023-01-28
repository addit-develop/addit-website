import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { MatchDetailDataType } from '@/types'
import MatchHeader from './matchHeader'

interface PropsType {
  fixtureId: number | undefined
  selectMode: boolean
  blockId: string
}

const MatchPrediction = ({ fixtureId, selectMode, blockId }: PropsType) => {
  const [predictionData, setPredictionData] = useState<MatchDetailDataType>()

  const axios = useAxios()
  const getPredictionData = useCallback(async () => {
    const response = await axios
      .get('/predictions', { params: { fixture: fixtureId } })
      .then((response) => {
        console.log(response)
        setPredictionData(response.data.response[0])
      })
      .catch((error) => {
        console.error(error)
      })
  }, [fixtureId])

  useEffect(() => {
    getPredictionData()
  }, [])

  if (fixtureId === undefined) {
    return (
      <React.Fragment>
        <Styles.Container>잘못된 접근입니다.</Styles.Container>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Styles.Container>
        <MatchHeader />
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchPrediction
