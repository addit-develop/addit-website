import produce from 'immer'

export const initialState = {
  blockData: {},
}

export const SET_BLOCK_DATA = 'SET_BLOCK_DATA'
export const SET_BLOCK_TYPE = 'SET_BLOCK_TYPE'

export const setBlockData = (data) => {
  return {
    type: SET_BLOCK_DATA,
    data,
  }
}

export const setBlockType = (data) => {
  return {
    type: SET_BLOCK_TYPE,
    data,
  }
}

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_BLOCK_DATA:
        draft.blockData.data = action.data
      case SET_BLOCK_TYPE:
        draft.blockData.type = action.data
      default:
        break
    }
  })

export default reducer
