import produce from 'immer'
import { PageAction } from '../actions/pageAction'
import { CHANGE_MODAL_PAGE } from '../types'

type StateType = {
  currentMenu: string
  currentPage: string
  pageProps: { fixtureId?: number } | undefined
}

export const initialState: StateType = {
  currentMenu: 'Matches',
  currentPage: 'matchHome',
  pageProps: {},
}

const pageReducer = (state: StateType = initialState, action: PageAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_MODAL_PAGE:
        draft.currentPage = action.data.page
        draft.currentMenu = action.data.menu
        draft.pageProps = action.data.props
        break
      default:
        break
    }
  })
}

export default pageReducer
