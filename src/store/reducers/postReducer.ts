import { BlockDataType, PostSummary } from '@/types'
import produce from 'immer'
import { MAKE_BLOCK_DATA, SAVE_POST_REQUEST, SAVE_POST_ERROR, SAVE_POST_SUCCESS, SET_BLOCK_DATA, SET_BLOCK_READY, SET_BLOCK_TYPE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_ERROR } from '../types'

type StateType = {
  blockDataList: BlockDataType[]
  modalPage: string
  savePostLoading : boolean
  savePostSuccess : boolean
  savePostError : any | null
  loadPostLoading : boolean
  loadPostSuccess : boolean
  loadPostError : any | null

  mainPosts: PostSummary[]
}

export const initialState: StateType = {
  blockDataList: [],
  modalPage: '',
  savePostLoading : false,
  savePostSuccess : false,
  savePostError : null,
  loadPostLoading : false,
  loadPostSuccess : false,
  loadPostError : null,
  
  mainPosts:[],
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
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true
        draft.loadPostSuccess = false
        draft.loadPostError = null
        draft.mainPosts = []
        break
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false
        draft.loadPostSuccess = true
        draft.mainPosts = action.data.map((x:PostSummary) => {
          const covertedTime = new Date(x.time).toString().split(' ')
          x.time=`${covertedTime[1]} ${covertedTime[2]} ${covertedTime[3]}`
          return x})
        break
      case LOAD_POST_ERROR:
        draft.loadPostLoading = false
        draft.loadPostError = action.error
        break
      default:
        break
    }
  })

export default postReducer
