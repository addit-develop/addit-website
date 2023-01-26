import * as Styles from './style'
import { default as React, useCallback, useEffect, useRef, useState } from 'react'
import MatchHome from '../match/matchHome'
import PlayerHome from '../player/playerHome'
import PlayerDetail from '../player/playerDetail'
import LeagueHome from '../league/leagueHome'
import { useSelector, useDispatch } from 'react-redux'
import { LeagueBlockType, BlockDataType } from '@/types'
import TeamDetail from '../team/teamDetail'
import { setBlockData, setBlockReady } from '@/store/actions/postAction'
import { RootState } from '@/store/reducers'
import MatchDetail from '../match/matchDetail'
import { changeModalPage } from '@/store/actions/pageAction'
import TeamHome from '../team/teamHome'
import LeagueDetail from '../league/leagueDetail'

interface Props {
  id: string
}
type MenuType = {
  page: string
  title: string
}

const SearchModal = ({ id }: Props) => {
  const dispatch = useDispatch()
  const { blockDataList } = useSelector((state: RootState) => state.postReducer)
  const { currentPage, currentMenu, pageId } = useSelector((state: RootState) => state.pageReducer)

  const menu: MenuType[] = [
    { page: 'matchHome', title: 'Matches' },
    { page: 'leagueHome', title: 'Leagues' },
    { page: 'teamHome', title: 'Teams' },
    { page: 'playerHome', title: 'Players' },
  ]

  const [modalClosed, setModalClosed] = useState<boolean>(false)
  const [selectMode, setSelectMode] = useState<boolean>(false)

  const closeModal = useCallback(() => {
    setModalClosed(true)
  }, [])

  const selectContent = useCallback(() => {
    // 선택된 데이터 바탕으로 블록 생성
    if (selectMode) {
      // 선택된 경기가 없는 리그 정보 삭제
      const filterData = blockDataList
        .find((x: BlockDataType) => x.id === id)
        ?.data.filter((x: LeagueBlockType) => x.fixtures.length !== 0)
      dispatch(setBlockData(id, filterData))
      dispatch(setBlockReady(id))
      setModalClosed(true)
    }
    // 데이터 선택 모드로 변경
    setSelectMode(!selectMode)
  }, [selectMode, blockDataList.find((x: BlockDataType) => x.id === id)])

  const showCurrentModalPage = useCallback(() => {
    switch (currentPage) {
      case 'matchHome':
        return <MatchHome selectMode={selectMode} id={id} />
      case 'matchDetail':
        return <MatchDetail selectMode={selectMode} id={id} fixtureId={pageProps?.fixtureId} />
      case 'leagueHome':
        return <LeagueHome />
      case 'leagueDetail':
        if (pageId) return <LeagueDetail leagueId={pageId} />
      case 'teamHome':
        return <TeamHome />
      case 'teamDetail':
        if (pageId) return <TeamDetail teamId={pageId} />
      case 'playerHome':
        return <PlayerHome />
      case 'playerDetail':
        if (pageId) return <PlayerDetail playerId={pageId} />
    }
  }, [currentPage])

  // const selectMenu = (m: MenuType) => {
  //   dispatch(changeModalPage(m.page, m.title))
  // }
  return (
    <React.Fragment>
      <Styles.Modal closed={modalClosed} id="addit-modal">
        <Styles.DragLine />
        <Styles.SearchContainer>
          <Styles.SearchInput placeholder="Search players, teams, leagues" />
          <Styles.ClearButton>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path
                d="M5.648 11.2 8 8.847l2.352 2.351.847-.847L8.848 8l2.351-2.352-.847-.847L8 7.152 5.648 4.801l-.847.847L7.152 8l-2.351 2.352ZM8 14.397a6.192 6.192 0 0 1-2.484-.5 6.366 6.366 0 0 1-2.04-1.375 6.366 6.366 0 0 1-1.374-2.039A6.192 6.192 0 0 1 1.602 8c0-.89.164-1.719.5-2.492.332-.774.789-1.45 1.375-2.031a6.366 6.366 0 0 1 2.039-1.375A6.192 6.192 0 0 1 8 1.602c.89 0 1.719.164 2.492.5.774.332 1.45.789 2.031 1.375a6.375 6.375 0 0 1 1.375 2.03c.336.774.5 1.602.5 2.493 0 .879-.164 1.707-.5 2.484a6.366 6.366 0 0 1-1.375 2.04 6.375 6.375 0 0 1-2.03 1.374c-.774.336-1.602.5-2.493.5Zm0 0"
                fill="#8a8a8a"
              />
            </svg>
          </Styles.ClearButton>
          <Styles.SearchButton>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path
                d="m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"
                fill="#8a8a8a"
              />
            </svg>
          </Styles.SearchButton>
        </Styles.SearchContainer>
        <Styles.SearchMenuContainer>
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
        <Styles.ContentContainer>{showCurrentModalPage()}</Styles.ContentContainer>
        <Styles.ModalMenuContainer>
          <Styles.AddButton disabled={false} onClick={selectContent}>
            {selectMode ? 'Add Block' : 'Select'}
          </Styles.AddButton>
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

export default SearchModal
