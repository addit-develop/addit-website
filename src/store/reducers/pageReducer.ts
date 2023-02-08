import produce from 'immer'
import { HYDRATE } from 'next-redux-wrapper'
import {
  SET_MODAL_PAGE,
  LOAD_DATA_START,
  LOAD_DATA_FINISH,
  CHANGE_SELECT_MODE,
  CLOSE_INFO_MODAL,
} from '../types'

type StateType = {
  currentMenu: string
  currentPage: string
  pageProps?: any
  loadingData: boolean
  history: { menu: string; page: string; props?: any }[]
  selectMode: boolean
  openInfoModal: boolean
}

export const initialState: StateType = {
  currentMenu: 'Matches',
  currentPage: 'matchHome',
  loadingData: false,
  history: [],
  selectMode: false,
  openInfoModal: false,
}

const pageReducerUnhydrate = (state: StateType = initialState, action: any) =>
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
        draft.openInfoModal = true
        break
      case LOAD_DATA_START:
        draft.loadingData = true
        break
      case LOAD_DATA_FINISH:
        draft.loadingData = false
        break
      case CHANGE_SELECT_MODE:
        draft.selectMode = action.data
        break
      case CLOSE_INFO_MODAL:
        draft.openInfoModal = false
        break
      default:
        break
    }
  })

  const pageReducer = (state: StateType = initialState, action: any) => {
    switch (action.type) {
      case HYDRATE:
        return {...state, ...action.payload}
      default: {
        return pageReducerUnhydrate
      }
    }
  };

export default pageReducer
