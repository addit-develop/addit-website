import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import postReducer from './post'
import userReducer from './user'

// (이전상태, 액션) -> 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action)
      return { ...state, ...action.payload }
    default: {
      const combinedReducer = combineReducers({
        userReducer,
        postReducer,
      })
      return combinedReducer(state, action)
    }
  }
}

export default rootReducer
