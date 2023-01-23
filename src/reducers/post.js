import produce from 'immer'

export const initialState = {
  blockDataList: [],
}

export const MAKE_BLOCK_DATA = 'MAKE_BLOCK_DATA'
export const SET_BLOCK_DATA = 'SET_BLOCK_DATA'
export const SET_BLOCK_TYPE = 'SET_BLOCK_TYPE'
export const SET_BLOCK_READY = 'SET_BLOCK_READY'

export const makeBlockData = (id, blockType) => {
  return {
    type: MAKE_BLOCK_DATA,
    id,
    blockType,
  }
}

export const setBlockData = (id, data) => {
  return {
    type: SET_BLOCK_DATA,
    id,
    data,
  }
}

export const setBlockType = (id, data) => {
  return {
    type: SET_BLOCK_TYPE,
    id,
    data,
  }
}

export const setBlockReady = (id) => {
  return {
    type: SET_BLOCK_READY,
    id,
  }
}

const reducer = (state = initialState, action) =>
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
        if (!myBlock.isReady) myBlock.data = action.data
        break
      case SET_BLOCK_TYPE:
        draft.blockDataList.find((x) => x.id === action.id).type = action.data
        break
      case SET_BLOCK_READY:
        draft.blockDataList.find((x) => x.id === action.id).isReady = true
        break
      default:
        break
    }
  })

export default reducer
