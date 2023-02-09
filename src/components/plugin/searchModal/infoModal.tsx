import * as Styles from './style'
import { default as React, useCallback, useEffect, useState } from 'react'
import MatchHome from '../match/matchHome'
import PlayerDetail from '../player/playerDetail'
import LeagueHome from '../league/leagueHome'
import { useDispatch, useSelector } from 'react-redux'
import TeamDetail from '../team/teamDetail'
import { RootState } from '@/store/reducers'
import MatchDetail from '../match/matchDetail'
import MatchPrediction from '../match/matchPrediction'
import TeamHome from '../team/teamHome'
import LeagueDetail from '../league/leagueDetail'
import SearchHome from '../search/searchHome'
import PlayerHome from '../player/playerHome'
import PlayerMatchDetail from '../player/playerMatchDetail'
import Loading from '../common/loading'
import { closeInfoModal } from '@/store/actions/pageAction'
import { CrossIcon } from '@/assets/icons'
import { COLORS } from '@/constants/constants'

const InfoModal = () => {
  const blockId = 'no block id'
  const dispatch = useDispatch()
  const { currentPage, pageProps, loadingData, openInfoModal } = useSelector(
    (state: RootState) => state.pageReducer
  )

  const closeModal = useCallback(() => {
    dispatch(closeInfoModal())
  }, [])

  useEffect(() => {
    console.log(openInfoModal)
  }, [openInfoModal])

  const showCurrentModalPage = useCallback(() => {
    switch (currentPage) {
      case 'searchHome':
        if (pageProps) {
          return <SearchHome searchKey={pageProps} />
        }
      case 'matchHome':
        return <MatchHome blockId={blockId} />
      case 'matchDetail':
        if (pageProps)
          return <MatchDetail selectMode={false} blockId={blockId} fixtureId={pageProps} />
        else break
      case 'matchPrediction':
        if (pageProps)
          return <MatchPrediction selectMode={false} blockId={blockId} fixtureData={pageProps} />
        else break
      case 'playerMatchDetail':
        return (
          <PlayerMatchDetail
            matchStatData={pageProps.matchStatData}
            playerData={pageProps.playerData}
            fixtureData={pageProps.fixtureData}
            selectMode={false}
            blockId={blockId}
          />
        )
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
  }, [currentPage, blockId, pageProps])

  return (
    <React.Fragment>
      <Styles.Modal closed={!openInfoModal} id="addit-modal">
        <Styles.DragLine />
        <Styles.ContentContainer>
          {loadingData ? <Loading /> : null}
          {showCurrentModalPage()}
        </Styles.ContentContainer>
        <Styles.ModalMenuContainer>
          <Styles.CloseButton onClick={closeModal}>
            <CrossIcon width={24} height={24} fill={COLORS.darkgray} />
          </Styles.CloseButton>
        </Styles.ModalMenuContainer>
      </Styles.Modal>
    </React.Fragment>
  )
}

export default InfoModal
