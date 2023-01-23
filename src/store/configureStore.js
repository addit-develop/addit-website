import { createWrapper } from 'next-redux-wrapper'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import rootSaga from '../sagas'

// redux-thunk를 커스텀한 미들웨어 (action을 dispatch할 때 logging 해주는 미들웨어)
const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action)
    return next(action)
  }

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, loggerMiddleware]
  const enhancer = compose(applyMiddleware(...middlewares))
  const store = createStore(reducer, enhancer)
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export const store = configureStore()

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
})

export default wrapper
