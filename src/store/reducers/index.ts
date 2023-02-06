import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import postReducer from './postReducer'
import pageReducer from './pageReducer'
import userReducer from './userReducer'

// (이전상태, 액션) -> 다음상태
const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action)
      return { ...state, ...action.payload }
    default: {
      const combinedReducer = combineReducers({
        userReducer,
        postReducer,
        pageReducer,
      })
      return combinedReducer(state, action)
    }
  }
}

// const rootReducer = combineReducers({
//   userReducer,
//   postReducer,
//   pageReducer,
// })

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
