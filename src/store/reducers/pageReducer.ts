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
  history: { menu: string; page: string; props?: any }[]
}

export const initialState: StateType = {
  currentMenu: 'Matches',
  currentPage: 'matchHome',
  loadingData: false,
  history: [],
}

const pageReducer = (state: StateType = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MODAL_PAGE:
        if (
          action.data.page === 'matchHome' ||
          action.data.page === 'leagueHome' ||
          action.data.page === 'teamHome' ||
          action.data.page === 'playerHome'
        )
          draft.history = []
        else if (!action.data.movedBack)
          draft.history.push({
            menu: draft.currentMenu,
            page: draft.currentPage,
            props: draft.pageProps,
          })
        else draft.history.pop()
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
