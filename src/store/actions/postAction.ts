import { MAKE_BLOCK_DATA, SET_BLOCK_DATA, SET_BLOCK_READY, SET_BLOCK_TYPE, SAVE_POST_REQUEST } from '../types'
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
