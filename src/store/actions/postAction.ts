import { MAKE_BLOCK_DATA, SET_BLOCK_DATA, SET_BLOCK_READY, SET_BLOCK_TYPE, SAVE_POST_REQUEST, LOAD_POST_REQUEST } from '../types'
import { Post } from '@/types'

export const makeBlockData = (id: string, blockType: string) => {
  return {
    type: MAKE_BLOCK_DATA,
    id,
    blockType,
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

export const savePostRequestAction = (post:Post) => {
  return {
    type:SAVE_POST_REQUEST,
    post:post,
  }
}

export const loadPostRequestAction = (constraint : any) => {
  return {
    type:LOAD_POST_REQUEST,
    constraint:{
      summary : constraint.summary || false, // load posts summary or not
      writers : constraint.writers || null, // load posts of specific users 
      hashtags : constraint.hashtags || null, // load posts with specific hashtags
      amount : constraint.amount || 5, // how many to load
      ids : constraint.ids || null, // load posts with specific ids
    },
  }
}