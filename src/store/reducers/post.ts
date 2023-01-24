import produce from 'immer'
import { SET_BLOCK_DATA, SET_BLOCK_TYPE } from '../types'

type StateType = {
  blockData: {
    type: string
    data: any[]
  }
}

export const initialState: StateType = {
  blockData: { type: '', data: [] },
}

const postReducer = (state: StateType = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_BLOCK_DATA:
        draft.blockData.data = action.data
      case SET_BLOCK_TYPE:
        draft.blockData.type = action.data
      default:
        break
    }
  })

export default postReducer
