import { BlockDataType } from '@/types'
import produce from 'immer'
import {
  MAKE_BLOCK_DATA,
  SAVE_POST_REQUEST,
  SAVE_POST_ERROR,
  SAVE_POST_SUCCESS,
  SET_BLOCK_DATA,
  SET_BLOCK_READY,
  SET_BLOCK_TYPE,
} from '../types'

type StateType = {
  blockDataList: BlockDataType[]
  modalPage: string
  savePostLoading: boolean
  savePostSuccess: boolean
  savePostError: any | null
}

export const initialState: StateType = {
  blockDataList: [],
  modalPage: '',
  savePostLoading: false,
  savePostSuccess: false,
  savePostError: null,
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
      case SAVE_POST_REQUEST:
        draft.savePostLoading = true
        draft.savePostError = null
        draft.savePostSuccess = false
        break
      case SAVE_POST_SUCCESS:
        draft.savePostLoading = false
        draft.savePostSuccess = true
        break
      case SAVE_POST_ERROR:
        draft.savePostLoading = false
        draft.savePostError = action.error
        break
      default:
        break
    }
  })

export default postReducer
