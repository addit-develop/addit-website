import * as Styles from './style'
import { default as React, useCallback, useState } from 'react'
import MatchHome from '../match/matchHome'
import PlayerDetail from '../player/playerDetail'
import LeagueHome from '../league/leagueHome'
import { useSelector, useDispatch } from 'react-redux'
import TeamDetail from '../team/teamDetail'
import { setBlockType } from '@/store/actions/postAction'
import { RootState } from '@/store/reducers'
import MatchDetail from '../match/matchDetail'
import MatchPrediction from '../match/matchPrediction'
import TeamHome from '../team/teamHome'
import LeagueDetail from '../league/leagueDetail'
import SearchHome from '../search/searchHome'
import PlayerHome from '../player/playerHome'
import PlayerMatchDetail from '../player/playerMatchDetail'
import Loading from '../common/loading'

interface Props {
  blockId: string
}
type MenuType = {
  page: string
  title: string
}

const InfoModal = ({ blockId }: Props) => {
  const dispatch = useDispatch()
  const { currentPage, pageProps, loadingData } = useSelector(
    (state: RootState) => state.pageReducer
  )

  const [modalClosed, setModalClosed] = useState<boolean>(true)
  const [selectMode, setSelectMode] = useState<boolean>(false)

  const closeModal = useCallback(() => {
    setModalClosed(true)
  }, [])

  const showCurrentModalPage = useCallback(() => {
    switch (currentPage) {
      case 'searchHome':
        if (pageProps) {
          return <SearchHome searchKey={pageProps} />
        }
      case 'matchHome':
        dispatch(setBlockType(blockId, 'Fixture_List_By_Date'))
        return <MatchHome selectMode={selectMode} blockId={blockId} />
      case 'matchDetail':
        dispatch(setBlockType(blockId, 'Match_Detail'))
        if (pageProps)
          return <MatchDetail selectMode={selectMode} blockId={blockId} fixtureId={pageProps} />
        else break
      case 'matchPrediction':
        dispatch(setBlockType(blockId, 'Match_Prediction'))
        if (pageProps)
          return (
            <MatchPrediction selectMode={selectMode} blockId={blockId} fixtureData={pageProps} />
          )
        else break
      case 'playerMatchDetail':
        return <PlayerMatchDetail data={pageProps} selectMode={selectMode} blockId={blockId} />
      case 'leagueHome':
        return <LeagueHome />
      case 'leagueDetail':
        if (pageProps) return <LeagueDetail blockId={blockId} leagueId={pageProps} />
        else break
      case 'teamHome':
        return <TeamHome />
      case 'teamDetail':
        if (pageProps)
          return (
            <TeamDetail blockId={blockId} teamId={pageProps.teamId} leagueId={pageProps.leagueId} />
          )
        else break
      case 'playerHome':
        return <PlayerHome leagueId={pageProps?.leagueId} searchKey={pageProps?.searchKey} />
      case 'playerDetail':
        if (pageProps) return <PlayerDetail blockId={blockId} playerId={pageProps} />
        else break
    }
  }, [currentPage, selectMode, blockId, pageProps])

  return (
    <React.Fragment>
      <Styles.Modal closed={modalClosed} id="addit-modal">
        <Styles.DragLine />
        <Styles.ContentContainer>
          {loadingData ? <Loading /> : null}
          {showCurrentModalPage()}
        </Styles.ContentContainer>
        <Styles.ModalMenuContainer>
          <Styles.CloseButton onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path
                d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"
                fill="#8C7B72"
              />
            </svg>
          </Styles.CloseButton>
        </Styles.ModalMenuContainer>
      </Styles.Modal>
    </React.Fragment>
  )
}

export default InfoModal