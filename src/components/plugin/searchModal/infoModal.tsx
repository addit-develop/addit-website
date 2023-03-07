import * as Styles from './style'
import { default as React, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { useBottomSheet } from '@/hooks/useBottomSheet'

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number // touchstart에서 터치 포인트의 Y값
  }
  touchMove: {
    prevTouchY?: number // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up' // 유저가 터치를 움직이고 있는 방향
  }
}

const InfoModal = () => {
  const blockId = 'no block id'
  const dispatch = useDispatch()
  const { currentPage, pageProps, loadingData, openInfoModal } = useSelector(
    (state: RootState) => state.pageReducer
  )

  useMemo(() => {
    dispatch(closeInfoModal())
  }, [])

  const closeModal = useCallback(() => {
    if (window.innerWidth > 600)
      sheet.current?.style.setProperty(
        'transform',
        `translateX(${window.innerHeight - sheet.current.getBoundingClientRect().x}px)`
      )
    else sheet.current?.style.setProperty('transform', `translateY(${window.innerHeight * 0.85}px)`)
    let closer = setTimeout(() => dispatch(closeInfoModal()), 150)
    return () => {
      clearTimeout(closer)
    }
  }, [])

  // 모달창 터치 이벤트
  const { sheet, content } = useBottomSheet({
    MIN_Y: window.innerHeight * 0.15,
    MAX_Y: window.innerHeight,
    CLOSE_Y: window.innerHeight * 0.6,
    closeModal: closeModal,
  })

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
      <Styles.InfoModal closed={!openInfoModal} id="addit-modal" ref={sheet}>
        <Styles.DragLine />
        <Styles.ContentContainer>
          {loadingData ? <Loading /> : null}
          {showCurrentModalPage()}
        </Styles.ContentContainer>
        <Styles.CloseInfoButton onClick={closeModal}>
          <CrossIcon width={24} height={24} fill={COLORS.darkgray} />
          Close
        </Styles.CloseInfoButton>
      </Styles.InfoModal>
    </React.Fragment>
  )
}

export default InfoModal
