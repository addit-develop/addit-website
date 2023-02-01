import produce from 'immer'
import { modalPageAction } from '../actions/pageAction'
import { LOAD_POST_ERROR, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, SET_MODAL_PAGE, TEAM_DETAIL_PAGE } from '../types'

type StateType = {
  currentMenu: string
  currentPage: string
  pageProps?: any
}

export const initialState: StateType = {
  currentMenu: 'Matches',
  currentPage: 'matchHome',

}

const pageReducer = (state: StateType = initialState, action: modalPageAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MODAL_PAGE:
        draft.currentPage = action.data.page
        draft.currentMenu = action.data.menu
        if (action.data.pageProps) draft.pageProps = action.data.pageProps
        break
      default:
        break
    }
  })

export default pageReducer
