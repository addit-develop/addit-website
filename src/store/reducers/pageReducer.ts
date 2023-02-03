import produce from 'immer'
import {
  LOAD_POST_ERROR,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  SET_MODAL_PAGE,
  TEAM_DETAIL_PAGE,
  LOAD_DATA_START,
  LOAD_DATA_FINISH,
} from '../types'

type StateType = {
  currentMenu: string
  currentPage: string
  pageProps?: any
  loadingData: boolean
}

export const initialState: StateType = {
  currentMenu: 'Matches',
  currentPage: 'matchHome',
  loadingData: false,
}

const pageReducer = (state: StateType = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MODAL_PAGE:
        draft.currentPage = action.data.page
        draft.currentMenu = action.data.menu
        if (action.data.pageProps) draft.pageProps = action.data.pageProps
        break
      case LOAD_DATA_START:
        draft.loadingData = true
        break
      case LOAD_DATA_FINISH:
        draft.loadingData = false
        break
      default:
        break
    }
  })

export default pageReducer
