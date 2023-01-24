import { BlockDataType } from '@/types'
import produce from 'immer'
import {
  MAKE_BLOCK_DATA,
  SET_BLOCK_DATA,
  SET_BLOCK_READY,
  SET_BLOCK_TYPE,
  CHANGE_MODAL_PAGE,
} from '../types'

type StateType = {
  blockDataList: BlockDataType[]
  modalPage: string
}

export const initialState: StateType = {
  blockDataList: [],
  modalPage: '',
}

const postReducer = (state: StateType = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MAKE_BLOCK_DATA:
        if (draft.blockDataList.find((x) => x.id === action.id) === undefined) {
          draft.blockDataList.push({
            id: action.id,
            type: action.blockType,
            isReady: false,
            data: [],
          })
        }
        break
      case SET_BLOCK_DATA:
        const myBlock = draft.blockDataList.find((x) => x.id === action.id)
        if (myBlock && !myBlock.isReady) myBlock.data = action.data
        break
      case SET_BLOCK_TYPE:
        const findBlock = draft.blockDataList.find((x) => x.id === action.id)
        if (findBlock) findBlock.type = action.data
        break
      case SET_BLOCK_READY:
        const readyBlock = draft.blockDataList.find((x) => x.id === action.id)
        if (readyBlock) readyBlock.isReady = true
        break
      case CHANGE_MODAL_PAGE:
        draft.modalPage = action.page
        break
      default:
        break
    }
  })

export default postReducer
