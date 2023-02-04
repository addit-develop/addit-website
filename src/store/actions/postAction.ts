import {
  MAKE_BLOCK_DATA,
  SET_BLOCK_DATA,
  SET_BLOCK_READY,
  SET_BLOCK_TYPE,
  SAVE_POST_REQUEST,
  LOAD_POST_REQUEST,
  LOAD_MAIN_POST_REQUEST,
  WRITE_POST_RESET_ACTION,
} from '../types'
import { Post } from '@/types'

export const makeBlockData = (id: string, blockType: string, blockData?: any) => {
  return {
    type: MAKE_BLOCK_DATA,
    id,
    blockType,
    blockData,
  }
}

export const setBlockData = (id: string, data: any) => {
  return {
    type: SET_BLOCK_DATA,
    id,
    data,
  }
}

export const setBlockType = (id: string, data: any) => {
  return {
    type: SET_BLOCK_TYPE,
    id,
    data,
  }
}

export const setBlockReady = (id: string) => {
  return {
    type: SET_BLOCK_READY,
    id,
  }
}

export const savePostRequestAction = (post: Post) => {
  return {
    type: SAVE_POST_REQUEST,
    post: post,
  }
}

export const loadPostRequestAction = (constraint: any) => {
  return {
    type: LOAD_POST_REQUEST,
    constraint: {
      summary: constraint.summary || false, // load posts summary or not
      writers: constraint.writers || null, // load posts of specific users
      hashtags: constraint.hashtags || null, // load posts with specific hashtags
      amount: constraint.amount || 1, // how many to load
      ids: constraint.ids || null, // load posts with specific ids
    },
  }
}

export const loadMainPostRequestAction = (constraint: any) => {
  return {
    type: LOAD_MAIN_POST_REQUEST,
    constraint: {
      summary: constraint.summary || true, // load posts summary or not
      writers: constraint.writers || null, // load posts of specific users
      hashtags: constraint.hashtags || null, // load posts with specific hashtags
      amount: constraint.amount || 5, // how many to load
      ids: constraint.ids || null, // load posts with specific ids
    },
  }
}

export const writePostResetReducerAction = () => {
  return {
    type: WRITE_POST_RESET_ACTION,
  }
}
