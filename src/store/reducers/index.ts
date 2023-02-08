import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import postReducer from './postReducer'
import pageReducer from './pageReducer'
import userReducer from './userReducer'

const pageReducerHydrated = (state : any, action : any) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action)
      return action.payload
    default: {
      return pageReducer
    }
  }
};
const rootReducer = combineReducers({
  userReducer,
  postReducer,
  pageReducerHydrated,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
