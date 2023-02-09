import * as Styles from './style'
import { default as React, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MatchHome from '../match/matchHome'
import PlayerDetail from '../player/playerDetail'
import LeagueHome from '../league/leagueHome'
import { useSelector, useDispatch } from 'react-redux'
import { FixtureListBlockType, BlockDataType } from '@/types'
import TeamDetail from '../team/teamDetail'
import {
  setBlockData,
  setBlockReady,
  makeBlockData,
  setBlockType,
} from '@/store/actions/postAction'
import { RootState } from '@/store/reducers'
import MatchDetail from '../match/matchDetail'
import MatchPrediction from '../match/matchPrediction'
import { changeModalPage, changeSelectMode } from '@/store/actions/pageAction'
import TeamHome from '../team/teamHome'
import LeagueDetail from '../league/leagueDetail'
import SearchModalInput from './searchModalInput'
import SearchHome from '../search/searchHome'
import PlayerHome from '../player/playerHome'
import PlayerMatchDetail from '../player/playerMatchDetail'
import Loading from '../common/loading'
import { ArrowLeftIcon, CrossIcon } from '@/assets/icons'
import { COLORS } from '@/constants/constants'

interface Props {
  blockId: string
  saveData: any
  savedblockData: BlockDataType
  deleteBlock: any
}
type MenuType = {
  page: string
  title: string
}

const SearchModal = ({ blockId, saveData, savedblockData, deleteBlock }: Props) => {
  const dispatch = useDispatch()
  const { blockDataList } = useSelector((state: RootState) => state.postReducer)
  const { currentPage, currentMenu, pageProps, loadingData, history, selectMode } = useSelector(
    (state: RootState) => state.pageReducer
  )
  const menu: MenuType[] = [
    { page: 'matchHome', title: 'Matches' },
    { page: 'leagueHome', title: 'Leagues' },
    { page: 'teamHome', title: 'Teams' },
    { page: 'playerHome', title: 'Players' },
  ]

  const [modalClosed, setModalClosed] = useState<boolean>(false)

  // 모달창 초기화 (이전에 작성한 블록이 있을 경우 모달창 정보가 남아있음)
  useEffect(() => {
    dispatch(changeModalPage('matchHome', 'Matches'))
  }, [])

  // 새로운 blockdata 생성
  useEffect(() => {
    console.log(blockId)
    if (savedblockData) dispatch(makeBlockData(blockId, savedblockData.type, savedblockData.data))
    else dispatch(makeBlockData(blockId, 'Fixture_List_By_Date'))
  }, [blockId])

  const closeModal = useCallback(() => {
    setModalClosed(true)
    deleteBlock()
  }, [])

  const canSelect = useMemo(() => {
    if (['leagueHome', 'teamHome', 'playerHome', 'searchHome'].includes(currentPage)) return false
    return true
  }, [currentPage])

  const selectContent = useCallback(() => {
    if (!canSelect) return null
    // 선택된 데이터 바탕으로 블록 생성
    if (selectMode) {
      // 선택된 경기가 없는 리그 정보 삭제
      const myBlock = blockDataList.find((x: BlockDataType) => x.id === blockId)
      var dataforSave = { type: myBlock?.type, data: myBlock?.data, isReady: true }
      if (myBlock?.type === 'Fixture_List_By_Date') {
        dataforSave.data = myBlock?.data.filter(
          (x: FixtureListBlockType) => x.fixtures.length !== 0
        )
        dispatch(setBlockData(blockId, dataforSave.data))
      }
      saveData(dataforSave)
      dispatch(setBlockReady(blockId))
      setModalClosed(true)
    }
    // 데이터 선택 모드로 변경
    dispatch(changeSelectMode(!selectMode))
  }, [selectMode, blockDataList, canSelect])

  const showCurrentModalPage = useCallback(() => {
    switch (currentPage) {
      case 'searchHome':
        if (pageProps) {
          return <SearchHome searchKey={pageProps} />
        }
      case 'matchHome':
        dispatch(setBlockType(blockId, 'Fixture_List_By_Date'))
        return <MatchHome blockId={blockId} />
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
        return (
          <PlayerMatchDetail
            matchStatData={pageProps.matchStatData}
            playerData={pageProps.playerData}
            fixtureData={pageProps.fixtureData}
            selectMode={selectMode}
            blockId={blockId}
          />
        )
      case 'leagueHome':
        return <LeagueHome />
      case 'leagueDetail':
        dispatch(setBlockType(blockId, 'League_Detail'))
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
        dispatch(setBlockType(blockId, 'Player_Detail'))
        if (pageProps) return <PlayerDetail blockId={blockId} playerId={pageProps} />
        else break
    }
  }, [currentPage, selectMode, blockId, pageProps])

  const cancelSelectMode = useCallback(() => {
    dispatch(changeSelectMode(false))
  }, [selectMode])

  const moveBack = useCallback(() => {
    if (history?.length) {
      const prevPage = history.slice(-1)[0]
      dispatch(changeModalPage(prevPage.page, prevPage.menu, prevPage.props, true))
    }
  }, [history])

  return (
    <React.Fragment>
      <Styles.Modal closed={modalClosed} id="addit-modal">
        <Styles.DragLine />
        <Styles.HeaderConatiner>
          <Styles.InputContainer>
            <SearchModalInput display={currentMenu === 'Players'} />
          </Styles.InputContainer>
          <Styles.SearchMenuContainer big={currentMenu !== 'Players'}>
            {menu.map((m, i) => {
              return (
                <Styles.SearchMenu
                  id={m.title}
                  key={i}
                  selected={currentMenu === m.title}
                  onClick={() => {
                    dispatch(changeModalPage(m.page, m.title))
                  }}
                >
                  {m.title}
                </Styles.SearchMenu>
              )
            })}
          </Styles.SearchMenuContainer>
        </Styles.HeaderConatiner>
        <Styles.ContentContainer>
          {history?.length ? (
            <Styles.backButton onClick={moveBack}>
              <ArrowLeftIcon width={24} height={24} fill={COLORS.darkgray} />
            </Styles.backButton>
          ) : null}
          {loadingData ? <Loading /> : null}
          {showCurrentModalPage()}
        </Styles.ContentContainer>
        <Styles.ModalMenuContainer>
          <Styles.AddButton disabled={!canSelect}>
            <span onClick={selectContent}>{selectMode ? 'Add Block' : 'Select'}</span>
            {selectMode ? (
              <Styles.CancelButton onClick={cancelSelectMode}>Cancel</Styles.CancelButton>
            ) : null}
          </Styles.AddButton>
          <Styles.CloseButton onClick={closeModal}>
            <CrossIcon width={24} height={24} fill={COLORS.darkgray} />
          </Styles.CloseButton>
        </Styles.ModalMenuContainer>
      </Styles.Modal>
    </React.Fragment>
  )
}

export default SearchModal
