import { PLAYER_DETAIL_PAGE, SET_MODAL_PAGE, TEAM_DETAIL_PAGE } from '../types'

export type PageAction = ReturnType<typeof changeModalPage>

export const changeModalPage = (page: string, menu: string, pageProps?: number) => {
  return {
    type: SET_MODAL_PAGE,
    data: {
      page,
      menu,
      pageProps,
    },
  }
}