import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import postReducer from './postReducer'
import pageReducer from './pageReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  pageReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
