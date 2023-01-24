import { CHANGE_MODAL_PAGE } from '../types'

export type PageAction = ReturnType<typeof changeModalPage>

export const changeModalPage = (page: string, menu: string) => {
  return {
    type: CHANGE_MODAL_PAGE,
    data: {
      page,
      menu,
    },
  }
}
