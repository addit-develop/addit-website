import * as Styles from './matchDetail-st'
import { default as React, useEffect, useCallback, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { MatchPredictionDataType } from '@/types'
import MatchHeader from './matchHeader'
import MatchScorePrediction from './matchScorePrediction'
import TeamForm from './teamForm'
import { FixtureType } from '@/types'
import HeadToHead from './headToHead'
import { useDispatch } from 'react-redux'
import { setBlockData } from '@/store/actions/postAction'
import SelectBox, { ElementContainer } from '../common/selectBox'
import { loadDataFinish, loadDataStart } from '@/store/actions/pageAction'

interface PropsType {
  fixtureData: FixtureType | undefined
  selectMode: boolean
  blockId: string
}

const MatchPrediction = ({ fixtureData, selectMode, blockId }: PropsType) => {
  const dispatch = useDispatch()
  const [predictionData, setPredictionData] = useState<MatchPredictionDataType>()
  const [predictionBlockData, setPredictionBlockData] = useState<{
    scorePrediction: boolean
    teamForm: boolean
    headToHead: boolean
    fixtureData: FixtureType | undefined
    predictionData: MatchPredictionDataType | undefined
  }>({
    scorePrediction: false,
    teamForm: false,
    headToHead: false,
    predictionData: predictionData,
    fixtureData: fixtureData,
  })

  useEffect(() => {
    if (predictionBlockData) dispatch(setBlockData(blockId, predictionBlockData))
  }, [predictionBlockData])

  const axios = useAxios()
  const getPredictionData = useCallback(async () => {
    dispatch(loadDataStart())
    const response = await axios
      .get('/predictions', { params: { fixture: fixtureData?.fixture.id } })
      .then((response) => {
        setPredictionData(response.data.response[0])
        setPredictionBlockData({
          scorePrediction: false,
          teamForm: false,
          headToHead: false,
          fixtureData: fixtureData,
          predictionData: response.data.response[0],
        })
        dispatch(loadDataFinish())
      })
      .catch((error) => {
        console.error(error)
      })
  }, [fixtureData])

  useEffect(() => {
    getPredictionData()
  }, [fixtureData])

  const selectElement = (type: string) => {
    switch (type) {
      case 'scorePrediction':
        setPredictionBlockData({
          ...predictionBlockData,
          scorePrediction: !predictionBlockData.scorePrediction,
        })
        break
      case 'teamForm':
        setPredictionBlockData({ ...predictionBlockData, teamForm: !predictionBlockData.teamForm })
        break
      case 'headToHead':
        setPredictionBlockData({
          ...predictionBlockData,
          headToHead: !predictionBlockData.headToHead,
        })
        break
    }
  }

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
        <ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={predictionBlockData.scorePrediction}
            onClick={() => selectElement('scorePrediction')}
          />
          <MatchScorePrediction predictionData={predictionData} />
        </ElementContainer>
        <ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={predictionBlockData.teamForm}
            onClick={() => selectElement('teamForm')}
          />
          <TeamForm predictionData={predictionData} />
        </ElementContainer>
        <ElementContainer>
          <SelectBox
            selectMode={selectMode}
            selected={predictionBlockData.headToHead}
            onClick={() => selectElement('headToHead')}
          />
          <HeadToHead predictionData={predictionData} />
        </ElementContainer>
      </Styles.Container>
    </React.Fragment>
  )
}

export default MatchPrediction
