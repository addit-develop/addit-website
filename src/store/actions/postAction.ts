import { PostBody, SET_BLOCK_DATA, SET_BLOCK_TYPE } from '../types'

export const setBlockData = (data: PostBody) => {
  return {
    type: SET_BLOCK_DATA,
    data,
  }
}

export const setBlockType = (data: PostBody) => {
  return {
    type: SET_BLOCK_TYPE,
    data,
  }
}
