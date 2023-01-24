import {
  MAKE_BLOCK_DATA,
  SET_BLOCK_DATA,
  SET_BLOCK_READY,
  SET_BLOCK_TYPE,
  CHANGE_MODAL_PAGE,
} from '../types'

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

export const chagneModalPage = (page: string) => {
  return {
    type: CHANGE_MODAL_PAGE,
    page,
  }
}
