import produce from 'immer'
import { PageAction } from '../actions/pageAction'
import { PLAYER_DETAIL_PAGE, SET_MODAL_PAGE, TEAM_DETAIL_PAGE } from '../types'

type StateType = {
  currentMenu: string
  currentPage: string
  pageId?: number
}

export const initialState: StateType = {
  currentMenu: 'Matches',
  currentPage: 'matchHome',
}

const pageReducer = (state: StateType = initialState, action: PageAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MODAL_PAGE:
        draft.currentPage = action.data.page
        draft.currentMenu = action.data.menu
        if (action.data.pageId) draft.pageId = action.data.pageId
        break
      // case PLAYER_DETAIL_PAGE:
      //   draft.currentPage = action.data.page
      //   draft.currentMenu = action.data.menu
      //   draft.data = action.data.playerId
      //   break
      // case TEAM_DETAIL_PAGE:
      //   draft.currentPage = action.data.page
      //   draft.currentMenu = action.data.menu
      //   draft.data = action.data.teamId
      //   break
      default:
        break
    }
  })

export default pageReducer
