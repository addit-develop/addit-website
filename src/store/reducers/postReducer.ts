import { BlockDataType, Post, PostSummary } from '@/types'
import produce from 'immer'
import { HYDRATE } from 'next-redux-wrapper'
import configureStore from '../configureStore'
import {
  LOAD_MAIN_POST_ERROR,
  LOAD_MAIN_POST_REQUEST,
  LOAD_MAIN_POST_SUCCESS,
  MAKE_BLOCK_DATA,
  SAVE_POST_REQUEST,
  SAVE_POST_ERROR,
  SAVE_POST_SUCCESS,
  SET_BLOCK_DATA,
  SET_BLOCK_READY,
  SET_BLOCK_TYPE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_ERROR,
  WRITE_POST_RESET_ACTION,
  EDIT_POST_ACTION,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
} from '../types'

type StateType = {
  blockDataList: BlockDataType[]
  modalPage: string

  exPost: Post | null
  savePostLoading: boolean
  savePostSuccess: boolean
  savePostError: any | null
  savedPostId: number | null

  loadPostLoading: boolean
  loadPostSuccess: boolean
  loadPostError: any | null
  loadPost: Post | null
  deletePostLoading: boolean
  deletePostSuccess: boolean
  deletePostError: any | null

  loadMainPostLoading: boolean
  loadMainPostSuccess: boolean
  loadMainPostError: any | null
  mainPosts: PostSummary[]
}

export const initialState: StateType = {
  blockDataList: [],
  modalPage: '',

  exPost: null,
  savePostLoading: false,
  savePostSuccess: false,
  savePostError: null,
  savedPostId: null,

  loadPostLoading: false,
  loadPostSuccess: false,
  loadPostError: null,
  loadPost: null,
  deletePostLoading: false,
  deletePostSuccess: false,
  deletePostError: null,

  loadMainPostLoading: false,
  loadMainPostSuccess: false,
  loadMainPostError: null,
  mainPosts: [],
}

const postReducer = (state: StateType = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MAKE_BLOCK_DATA:
        if (draft.blockDataList.find((x) => x.id === action.id) === undefined) {
          draft.blockDataList.push({
            id: action.id,
            type: action.blockType,
            isReady: action.blockData ? true : false,
            data: action.blockData,
          })
        }
        break
      case SET_BLOCK_DATA:
        const myBlock = draft.blockDataList.find((x) => x.id === action.id)
        if (myBlock && !myBlock.isReady) myBlock.data = action.data
        break
      case SET_BLOCK_TYPE:
        const findBlock = draft.blockDataList.find((x) => x.id === action.id)
        if (findBlock && !findBlock.isReady) findBlock.type = action.data
        break
      case SET_BLOCK_READY:
        const readyBlock = draft.blockDataList.find((x) => x.id === action.id)
        if (readyBlock) readyBlock.isReady = true
        break
      case SAVE_POST_REQUEST:
        draft.savePostLoading = true
        draft.savePostError = null
        draft.savePostSuccess = false
        draft.savedPostId = null
        break
      case SAVE_POST_SUCCESS:
        draft.savePostLoading = false
        draft.savePostSuccess = true
        draft.savedPostId = action.data
        draft.blockDataList = []
        break
      case SAVE_POST_ERROR:
        draft.savePostLoading = false
        draft.savePostError = action.error
        break
      case LOAD_POST_REQUEST:
        draft.loadPost = null
        draft.deletePostLoading = false
        draft.deletePostSuccess = false
        draft.deletePostError = null
        draft.loadPostLoading = true
        draft.loadPostSuccess = false
        draft.loadPostError = null
        break
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false
        draft.loadPostSuccess = true
        draft.loadPost = action.data[0]
        break
      case LOAD_POST_ERROR:
        draft.loadPostLoading = false
        draft.loadPostError = action.error
        break
      case LOAD_MAIN_POST_REQUEST:
        draft.loadMainPostLoading = true
        draft.loadMainPostSuccess = false
        draft.loadMainPostError = null
        draft.mainPosts = []
        break
      case LOAD_MAIN_POST_SUCCESS:
        draft.loadMainPostLoading = false
        draft.loadMainPostSuccess = true
        draft.mainPosts = action.data
        break
      case LOAD_MAIN_POST_ERROR:
        draft.loadMainPostLoading = false
        draft.loadMainPostError = action.error
        break
      case WRITE_POST_RESET_ACTION:
        draft.savedPostId = null
        draft.savePostSuccess = false
        draft.exPost = null
        break
      case EDIT_POST_ACTION:
        draft.loadPostLoading = false
        draft.loadPostError = null
        draft.exPost = draft.loadPost?{...draft.loadPost}:null
        draft.loadPost = null
        break
      case DELETE_POST_REQUEST:
        draft.loadPostLoading = false
        draft.loadPostError = null
        draft.deletePostLoading = true
        draft.deletePostSuccess = false
        draft.deletePostError = null
        break
      case DELETE_POST_SUCCESS:
        draft.deletePostLoading = false
        draft.deletePostSuccess = true
        draft.loadPost = null
      break
      case DELETE_POST_ERROR:
        draft.deletePostLoading = false
        draft.deletePostError = action.error
      break
      default:
        break
    }
  })

export default postReducer