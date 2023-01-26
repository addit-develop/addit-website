import { PLAYER_DETAIL_PAGE, SET_MODAL_PAGE, TEAM_DETAIL_PAGE } from '../types'

export type PageAction =
  | ReturnType<typeof changeModalPage>
  | ReturnType<typeof playerDetailPage>
  | ReturnType<typeof teamDetailPage>

export const changeModalPage = (page: string, menu: string, pageId?: number) => {
  return {
    type: SET_MODAL_PAGE,
    data: {
      page,
      menu,
      pageId,
    },
  }
}

export const playerDetailPage = (page: string, menu: string, playerId: number) => {
  return {
    type: PLAYER_DETAIL_PAGE,
    data: {
      page,
      menu,
      playerId,
    },
  }
}

export const teamDetailPage = (page: string, menu: string, teamId: number) => {
  return {
    type: TEAM_DETAIL_PAGE,
    data: {
      page,
      menu,
      teamId,
    },
  }
}
