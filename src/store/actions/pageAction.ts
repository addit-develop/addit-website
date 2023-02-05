import {
  PLAYER_DETAIL_PAGE,
  SET_MODAL_PAGE,
  TEAM_DETAIL_PAGE,
  LOAD_DATA_START,
  LOAD_DATA_FINISH,
  CHANGE_SELECT_MODE,
} from '../types'

export type modalPageAction = ReturnType<typeof changeModalPage>

export const changeModalPage = (
  page: string,
  menu: string,
  pageProps?: any,
  movedBack?: boolean
) => {
  return {
    type: SET_MODAL_PAGE,
    data: {
      page,
      menu,
      pageProps,
      movedBack,
    },
  }
}

export const loadDataStart = () => {
  return {
    type: LOAD_DATA_START,
  }
}

export const loadDataFinish = () => {
  return {
    type: LOAD_DATA_FINISH,
  }
}

export const changeSelectMode = (mode: boolean) => {
  return {
    type: CHANGE_SELECT_MODE,
    data: mode,
  }
}
